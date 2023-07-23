import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import database from "../database/conection";

const auth = async (next: NextFunction, req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  try {
    // Se o Baerer Token não for enviado então o token é inválido
    if (!authHeader) throw "Token Inválido";

    // Se for enviado, então checar se ele é Baerer Token e não só Token ou só Baerer
    const parts = authHeader.split(" ");
    if (!(parts.length === 2)) throw "Erro no Token";

    // Se tiver as duas partes então devemos checar se a primeira é mesmo ou começa por Baerer
    const [scheme, token] = parts;
    if (!/^Baerer$/i.test(scheme)) throw "Token mal formatado";

    // Pegando a base para descodificar o token
    const secret = process.env.SECRET as string;

    // Pegando o id do usuário já descodificado
    const { id } = Jwt.verify(token as string, secret) as JwtPayload;

    // Pegando os dados do usuário no banco de dados pelo id
    const result = await database.ref(`users/${id}`).get();
    const userId = result.key;

    // Se não existir um usuário com este Id então o Token é inválido
    if (!id) throw "Token Inválido";

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

export default auth;
