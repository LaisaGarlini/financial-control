import express from 'express';
import CartaoController from '../controllers/cartaoController'

const router = express.Router();

router.get('/cartao', CartaoController.listar);
router.get('/cartao/:id', CartaoController.buscarPorId);
router.post('/cartao', CartaoController.criar);
router.put('/cartao/:id', CartaoController.atualizar);
router.delete('/cartao/:id', CartaoController.deletar);

export default router;