import express from "express";

const router = express.Router();

// Criar tarefa
router.post("/", (req, res) => {
  const { title, description } = req.body;
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
