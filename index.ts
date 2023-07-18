import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const PORT = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port || PORT, () => {
  console.log(`⚡️ Servidor está rodando na porta: http://localhost:${PORT}`);
});
