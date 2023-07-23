import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Configuração necessária para acessar variavéis de ambiente
dotenv.config();

const app = express();
const router = express.Router();
const defaultPort = process.env.PORT;
const PORT = defaultPort || 8000;

// Permitir requisições com JSON e acessibilidade para Cors
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor OK!"));

require("../routes/tasks")(app);
require("../controllers/user.controller")(app);

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️ Servidor está rodando na porta: ${PORT}`);
});
