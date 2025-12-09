import { Request, Response } from 'express';
import { buscarAlunoIdPorUsuarioId } from '../models/alunoModel';
import { buscarHorarioPorHora, inserirAula } from '../models/aulaModel';

export function agendarAula(req: Request, res: Response) {
  const { data, horario } = req.body;
  const usuario = req.session.usuarioId;

  if (!usuario) {
    return res.redirect('/login');
  }

  buscarAlunoIdPorUsuarioId(usuario, (err: any, aluno: any) => {
    if (err || !aluno) {
      console.error('Erro ao buscar aluno:', err);
      return res.status(500).send('Erro ao buscar aluno');
    }

    buscarHorarioPorHora(horario, (err: any, horarioRow: any) => {
      if (err || !horarioRow) {
        console.error('Erro ao buscar horário:', err);
        return res.status(500).send('Erro ao buscar horário');
      }

      inserirAula(data, horarioRow.id, aluno.id, (err: any) => {
        if (err) {
          if (err.message.includes('Já existe uma aula agendada')) {
            // Aula duplicada no mesmo dia e horário
            return res.render('agendamento', {
              erro: 'Você já possui uma aula agendada neste dia e horário.',
            });
          }

          console.error('Erro ao agendar aula:', err);
          return res.status(500).send('Erro ao agendar aula');
        }

        res.render('agendamento', { sucesso: 'Aula agendada com sucesso!' });
      });
    });
  });
}
