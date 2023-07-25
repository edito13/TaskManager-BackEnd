import express, { Request, Response } from "express";
import database from "../database/conection";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

// Criar tarefa
router.post("/task", auth, async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const page = 1;
    const limit = 4;
    const taskRef = await database
      .ref("tasks")
      .push({ title, description, userId });

    const totalTasks = await database.ref("tasks").count();
    const totalPages = Math.ceil(totalTasks / limit);

    // Pegar novos dados
    const result = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .skip((page - 1) * limit)
      .take(limit)
      .get();

    const tasks = result.map((task) => ({
      id: task.key,
      ...task.val(),
    }));

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send({ error });
  }
});

// Selecionar tarefa
router.get("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await database.ref(`tasks/${id}`).get();
    const task = await result.val();

    if (task) return res.json(task);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Selecionar tarefas
router.get("/task", auth, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(limit as string, 10) || 4;

    const totalTasks = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .get();

    const totalPages = Math.ceil(totalTasks.length / itemsPerPage);

    const result = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .skip((pageNumber - 1) * itemsPerPage)
      .take(itemsPerPage)
      .get();

    const tasks = result.map((task) => ({
      id: task.key,
      ...task.val(),
    }));

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Atualizar tarefa:
router.put("/task/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const taskRef = await database
      .ref(`tasks/${id}`)
      .update({ title, description });

    const page = 1;
    const limit = 4;
    const totalTasks = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .get();

    const totalPages = Math.ceil(totalTasks.length / limit);

    // Pegar novos dados
    const result = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .skip((page - 1) * limit)
      .take(limit)
      .get();

    const tasks = result.map((task) => ({
      id: task.key,
      ...task.val(),
    }));

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Deletar tarefa
router.delete("/task/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const page = 1;
    const limit = 4;
    const taskRef = await database.ref(`tasks/${id}`).remove();

    const totalTasks = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .get();

    const totalPages = Math.ceil(totalTasks.length / limit);

    // Pegar novos dados
    const result = await database
      .query("tasks")
      .filter("userId", "==", userId)
      .skip((page - 1) * limit)
      .take(limit)
      .get();

    const tasks = result.map((task) => ({
      id: task.key,
      ...task.val(),
    }));

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
});

export default router;
