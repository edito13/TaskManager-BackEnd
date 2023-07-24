import express from "express";
import database from "../database/conection";

const router = express.Router();

interface usersData {
  name: string;
  email: string;
  password: string;
}

// Cadastrar usuário
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cadastrando o usuário no banco de dados usando o AceBase
    const userRef = await database.ref("users").push({ name, email, password });
    res.send("Usuário cadastrado com sucesso");
  } catch (error) {
    res.status(401).send("Ocorreu um erro ao cadastrar o usuário");
  }
});

// Logar usuário
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = database
      .query("users")
      .filter("email", "==", email)
      .take(1)
      .get();
    const users: usersData[] = (await result).getValues();

    if (users.length > 0) {
      const user = users[0];
      return res.json(user);
    }

    res.json([]);
  } catch (error) {
    res.status(401).send("Ocorreu um erro ao cadastrar o usuário");
  }
});

// Selecionar usuários
router.get("/user", async (req, res) => {
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

export default router;
