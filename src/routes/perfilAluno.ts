import express from 'express';
import { mostrarPerfilAluno } from '../controllers/alunoController';

const router = express.Router();

router.get('/', mostrarPerfilAluno);

export default router;
