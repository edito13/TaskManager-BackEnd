import { Request, Response } from "express";
import database from "../database/conection";
import selectAllUserTaks from "../assets/selectAllUserTasks";

// Criar tarefa
export const createTask = async (req: Request, res: Response) => {
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
    const tasks = await selectAllUserTaks(userId, page, limit);

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send({ error });
  }
};

// Selecionar tarefa
export const selectTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await database.ref(`tasks/${id}`).get();
    const task = await result.val();

    if (task) return res.json(task);

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
};

// Selecionar tarefas
export const selectTasks = async (req: Request, res: Response) => {
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

    // Pegar Tasks filtradas
    const tasks = await selectAllUserTaks(userId, pageNumber, itemsPerPage);

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
};

// Atualizar tarefa:
export const editTask = async (req: Request, res: Response) => {
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

    // Pegar Tasks alteradas
    const tasks = await selectAllUserTaks(userId, page, limit);

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
};

// Deletar tarefa
export const deleteTask = async (req: Request, res: Response) => {
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

    // Pegar novas lista de Tasks
    const tasks = await selectAllUserTaks(userId, page, limit);

    if (tasks) return res.json({ tasks, totalPages });

    res.json([]);
  } catch (error) {
    res.status(401).send(error);
  }
};
