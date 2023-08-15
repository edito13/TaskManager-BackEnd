import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import taskController from "./routers/task.router";
import userController from "./routers/user.router";

// Configuração necessária para acessar variavéis de ambiente
dotenv.config();

const app = express();
const router = express.Router();
const defaultPort = process.env.PORT;
const PORT = defaultPort || 8000;

// Permitir requisições com JSON e acessibilidade para Cors
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is OK!"));

app.use(taskController);
app.use(userController);
app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️ Servidor está rodando na porta: ${PORT}`);
});
