import express from 'express';
import { agendarAula } from '../controllers/aulaController';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('agendamento');
});

router.post('/agendar', agendarAula);

export default router;
