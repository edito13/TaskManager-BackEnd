import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = express.Router();
const defaultPort = process.env.PORT;
const PORT = defaultPort || 8000;

// Permitir requisições com JSON e ev
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor OK!");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️ Servidor está rodando na porta: ${PORT}`);
});
