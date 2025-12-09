import { Database } from 'sqlite3';

const db = new Database('./src/database/banco.db');

export function buscarAlunoIdPorUsuarioId(usuarioId: number, callback: Function) {
  const query = `
    SELECT id, nome_completo, cpf, celular, sexo
    FROM alunos
    WHERE usuario_id = ?
  `;

  db.get(query, [usuarioId], (err, row) => {
    if (err) {
      console.error('Erro no banco:', err);
      return callback(err);
    }
    callback(null, row);
  });
}

export function buscarHorarioPorHora(hora: string, callback: Function) {
  db.get(`SELECT id FROM horario WHERE hora = ?`, [hora], (err, row) => {
    callback(err, row);
  });
}

export function inserirAula(dia: string, horarioId: number, alunoId: number, callback: Function) {
  const verificarQuery = `
    SELECT id FROM aula
    WHERE dia = ? AND horario_id = ? AND aluno_id = ?
  `;

  db.get(verificarQuery, [dia, horarioId, alunoId], (err, row) => {
    if (err) {
      console.error('Erro ao verificar aula existente:', err);
      return callback(err);
    }

    if (row) {
      // Já existe uma aula nesse dia e horário para o mesmo aluno
      return callback(new Error('Já existe uma aula agendada para este dia e horário.'));
    }

    // Se não existir, insere normalmente
    db.run(
      `INSERT INTO aula (dia, horario_id, aluno_id) VALUES (?, ?, ?)`,
      [dia, horarioId, alunoId],
      function (err) {
        if (err) {
          console.error('Erro ao inserir aula:', err);
        }
        callback(err);
      }
    );
  });
}
