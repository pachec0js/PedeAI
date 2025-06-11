import express from 'express';
import {
  listarRecompensas,
  criarRecompensa,
  atualizarRecompensa,
  deletarRecompensa,
  uploadImagemRecompensa
} from '../controllers/recompensaController.js';
import verifyToken from '../middlewares/auth.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', verifyToken, listarRecompensas);
router.post('/', verifyToken, onlyAdmin, criarRecompensa);
router.put('/:id', verifyToken, onlyAdmin, atualizarRecompensa);
router.delete('/:id', verifyToken, onlyAdmin, deletarRecompensa);

router.post('/imagem/:id', verifyToken, onlyAdmin, upload.single('imagem'), uploadImagemRecompensa);

export default router;