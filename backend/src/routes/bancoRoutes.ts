import express from 'express';
import BancoController from '../controllers/bancoController'

const router = express.Router();

router.get('/banco', BancoController.listar);
router.get('/banco/:id', BancoController.buscarPorId);
router.post('/banco', BancoController.criar);
router.put('/banco/:id', BancoController.atualizar);
router.delete('/banco/:id', BancoController.deletar);

export default router;