import { Request, Response, NextFunction } from 'express';

export function verificarAutenticacao(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.usuarioId) {
    return next(); // usuário está logado
  }
  res.redirect('/login'); // redireciona para o login se não estiver logado
}
