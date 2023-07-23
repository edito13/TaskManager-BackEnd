import express from "express";
import database from "../database/conection";

const router = express.Router();

// Criar tarefa
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await database.ref("tasks").set({ title, description });

    res.send("Tarefa criada com sucesso");
  } catch (error) {
    res.status(401).send({ error });
  }
});

// Selecionar tarefa
router.get("/:id", (req, res) => {});

// Selecionar tarefas
router.get("/", (req, res) => {
  res.send("Chegou!");
});

// Atualizar tarefa
router.put("/", (req, res) => {
  const { title, description } = req.body;
});

// Deleter tarefa
router.delete("/:id", (req, res) => {
  const { title, description } = req.body;
});

module.exports = (app: any) => app.use("/task", router);
