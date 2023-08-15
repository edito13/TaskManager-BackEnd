import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configuração necessária para acessar variavéis de ambiente
dotenv.config();

const generateToken = (id: string) => {
  const secret = process.env.SECRET as string;
  const token = Jwt.sign({ id }, secret);

  return token;
};

export default generateToken;
