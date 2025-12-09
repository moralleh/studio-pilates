import express from 'express';
import { Database } from 'sqlite3';

const router = express.Router();

const db = new Database('./src/database/banco.db');

// Exibe o formulário de login
router.get('/', (req, res) => {
  res.render('login', { erro: null });
});

// Processa o formulário de login
router.post('/', (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (erro, usuario: { id: number }) => {
    if (erro) {
      console.error(erro);
      return res.render('login', { erro: 'Erro no banco de dados' });
    }
    
    if (usuario) {
      req.session.usuarioId = usuario.id;
      res.redirect('/agendarAula');
    } else {
      res.render('login', { erro: 'Email ou senha inválidos.' });
    }
  });
});

export default router;