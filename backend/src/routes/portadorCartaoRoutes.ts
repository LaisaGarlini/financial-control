import express from 'express';
import PortadorCartaoController from '../controllers/portadorCartaoController'

const router = express.Router();

router.get('/portador_cartao', PortadorCartaoController.listar);
router.get('/portador_cartao/:id', PortadorCartaoController.buscarPorId);
router.post('/portador_cartao', PortadorCartaoController.criar);
router.put('/portador_cartao/:id', PortadorCartaoController.atualizar);
router.delete('/portador_cartao/:id', PortadorCartaoController.deletar);

export default router;