import express from 'express';
import { comentarios } from '../controllers/agendarAulaController';
import { verificarAutenticacao } from '../middlewares/autenticacao';

const router = express.Router();

router.get('/', verificarAutenticacao, comentarios);

export default router;
