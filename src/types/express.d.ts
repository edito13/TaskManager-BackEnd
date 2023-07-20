// Re-declarando a tipagem do Express para poder acessar o id do usuário pela Request

declare namespace Express {
  interface Request {
    userId: string;
  }
}
