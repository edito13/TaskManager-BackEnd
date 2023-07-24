import express from "express";
import bcrypt from "bcrypt";
import database from "../database/conection";
import { generateToken } from "../assets/GenerateToken";

const router = express.Router();

interface usersData {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Cadastrar usuário
router.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cadastrando o usuário no banco de dados usando o AceBase
    const userRef = await database
      .query("users")
      .filter("email", "==", email)
      .take(1)
      .get();

    const user = userRef.getValues();

    // Se já existe um usuário então retonará um erro
    if (user.length) throw "Já existe um usuário com esse email.";

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword };

    const newUserRef = await database.ref("users").push(newUser);

    const id = newUserRef.key;

    const token = generateToken(id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(401).send(error);
  }
});

// Logar usuário
router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRef = await database
      .query("users")
      .filter("email", "==", email)
      .take(1)
      .get();

    const user: usersData = userRef.map((user) => ({
      id: user.key,
      ...user.val(),
    }))[0];

    // Se existir um usuário com este email então é hora de verificar a senha
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      // Se a senha estiver incorrecta
      if (!checkPassword) throw "Sua senha está incorreta, tente novamente.";

      const id = user.id;

      const token = generateToken(id);

      return res.status(201).json({ token });
    }

    res.json(userRef);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Selecionar usuários
router.get("/users", async (req, res) => {
  try {
    const result = await database.ref("users").get();
    const usersData = await result.val();

    const users = Object.keys(usersData).map((userId) => ({
      id: userId,
      ...usersData[userId],
    }));

    if (users) return res.json(users);

    res.send([]);
  } catch (error) {
    res.status(401).send("Ocorreu um erro ao selecionar os usuários");
  }
});

// Deleter user
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await database.ref(`users/${id}`).remove();

    const usersRef = await database.ref("users").get();
    const usersData = usersRef.val();

    const users: usersData[] = Object.keys(usersData).map((id) => ({
      id: id,
      ...usersData[id],
    }));

    if (users) return res.json(users);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

export default router;
