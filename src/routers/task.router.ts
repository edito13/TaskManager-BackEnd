import express from "express";
import auth from "../middlewares/auth.middleware";
import {
  createTask,
  deleteTask,
  editTask,
  selectTask,
  selectTasks,
} from "../controllers/task.controller";

const router = express.Router();

router.post("/task", auth, createTask);

router.get("/task", auth, selectTasks);

router.get("/task/:id", selectTask);

router.put("/task/:id", auth, editTask);

router.delete("/task/:id", auth, deleteTask);

export default router;
