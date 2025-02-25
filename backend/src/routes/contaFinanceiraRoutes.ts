import express from 'express';
import ContaFinanceiraController from '../controllers/contaFinanceiraController'

const router = express.Router();

router.get('/conta_financeira', ContaFinanceiraController.listar);
router.get('/conta_financeira/:id', ContaFinanceiraController.buscarPorId);
router.post('/conta_financeira', ContaFinanceiraController.criar);
router.put('/conta_financeira/:id', ContaFinanceiraController.atualizar);
router.delete('/conta_financeira/:id', ContaFinanceiraController.deletar);

export default router;