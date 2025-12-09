import { Database } from 'sqlite3';

const db = new Database('./src/database/banco.db');

export function buscarAlunoPorUsuarioId(usuarioId: number, callback: Function) {
  const query = `
    SELECT nome_completo, cpf, celular, sexo
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

export function buscarAlunoIdPorUsuarioId(usuarioId: number, callback: Function) {
  const query = `
    SELECT id
    FROM alunos
    WHERE usuario_id = ?
  `;

  db.get(query, [usuarioId], (err, row) => {
    if (err) {
      console.error('Erro ao buscar ID do aluno:', err);
      return callback(err);
    }
    callback(null, row);
  });
}
