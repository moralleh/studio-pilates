import express, { Request, Response } from 'express';
import { home } from '../controllers/homeController';

const router = express.Router();

router.get('/', home);

export default router;