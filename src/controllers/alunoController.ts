import { Request, Response } from 'express';
import { buscarAlunoPorUsuarioId } from '../models/alunoModel';

export function mostrarPerfilAluno(req: Request, res: Response) {
  const usuarioId = req.session?.usuarioId;
  console.log('usuarioId da sessão:', usuarioId);

  if (!usuarioId) {
    return res.redirect('/login');
  }

  buscarAlunoPorUsuarioId(usuarioId, (err: any, aluno: any) => {
    if (err) {
      console.error('Erro ao buscar aluno:', err);
      return res.status(500).send('Erro ao buscar dados do aluno.');
    }

    if (!aluno) {
      return res.send('Nenhum aluno vinculado a este usuário.');
    }

    res.render('perfilAluno', { aluno });
  });
}
