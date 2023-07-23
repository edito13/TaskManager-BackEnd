import express from "express";
import database from "../database/conection";

const router = express.Router();

// Criar tarefa
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const userId = "lkfaxdq9000ah4bimmj2y53d";

  try {
    const task = await database
      .ref("tasks")
      .push({ title, description, userId });

    res.send("Tarefa criada com sucesso");
  } catch (error) {
    res.status(401).send({ error });
  }
});

// Selecionar tarefa
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await database.ref(`tasks/${id}`).get();
    const task = result.val();

    if (task) return res.json(task);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Selecionar tarefas
router.get("/", async (req, res) => {
  const userId = "lkfaxdq9000ah4bimmj2y53d";

  try {
    const result = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .get();

    const tasks = result.map((task) => ({
      id: task.key,
      ...task.val(),
    }));

    if (tasks) return res.send(tasks);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Atualizar tarefa
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await database.ref(`tasks/${id}`).set({ title, description });

    const result = await database.ref("tasks").get();
    const tasksData = result.val();

    const tasks = Object.keys(tasksData).map((taskId) => ({
      id: taskId,
      ...tasksData[taskId],
    }));

    if (tasks) return res.json(tasks);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Deleter tarefa
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await database.ref(`tasks/${id}`).remove();

    const result = await database.ref("tasks").get();
    const tasksData = result.val();

    const tasks = Object.keys(tasksData).map((taskId) => ({
      id: taskId,
      ...tasksData[taskId],
    }));

    if (tasks) return res.json(tasks);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = (app: any) => app.use("/task", router);
