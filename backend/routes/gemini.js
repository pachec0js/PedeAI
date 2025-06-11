import express from 'express';
import { responderGemini } from '../controllers/geminiController.js';

const router = express.Router();

router.post('/bread', responderGemini);

export default router;
