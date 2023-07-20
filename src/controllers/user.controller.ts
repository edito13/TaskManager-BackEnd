import express from "express";
import database from "../database/conection";

const router = express.Router();

// Cadastrar usuário
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cadastrando o usuário no banco de dados usando o AceBase
    const userRef = await database.ref("users").push({ name, email, password });
    res.send("Usuário cadastrado com sucesso");
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao cadastrar o usuário");
  }
});

// Logar usuário
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
});

// Selecionar usuários
router.get("/", async (req, res) => {
  try {
    const result = await database.ref("users").get();
    const users = await result.val();

    if (users) res.json(users);

    res.send([]);
  } catch (error) {
    res.status(500).send("Ocorreu um erro ao selecionar os usuários");
  }
});

// Pegando a instância do meu app para definir um padrão para as rotas das requisiões do usuário
module.exports = (app: any) => app.use("/user", router);
