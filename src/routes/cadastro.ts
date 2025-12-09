import express from 'express';
import { Database } from 'sqlite3';

const router = express.Router();
const db = new Database('./src/database/banco.db');

router.get('/', (_req, res) => {
  res.render('cadastro');
});

// ENVIO DO FORMULÁRIO
router.post('/', (req, res) => {
  const { nome, sexo, cpf, celular, email, senha } = req.body;

  db.run(
    `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
    [email, senha],
    function (err) {
      if (err) {
        console.error('Erro ao inserir em usuarios:', err.message);
        return res.status(400).send('Erro no cadastro de usuário.');
      }

      const usuarioId = this.lastID;

      db.run(
        `INSERT INTO alunos (usuario_id, nome_completo, cpf, celular, sexo)
         VALUES (?, ?, ?, ?, ?)`,
        [usuarioId, nome, cpf, celular, sexo[0].toUpperCase()],
        function (err2) {
          if (err2) {
            console.error('Erro ao inserir em alunos:', err2.message);
            return res.status(400).send('Erro no cadastro do aluno.');
          }

          res.status(200).json({ message: 'ok' });
        }
      );
    }
  );
});

export default router; 