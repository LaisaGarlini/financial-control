import express from 'express';
import PortadorController from '../controllers/portadorController.'

const router = express.Router();

router.get('/portador', PortadorController.listar);
router.get('/portador/:id', PortadorController.buscarPorId);
router.post('/portador', PortadorController.criar);
router.put('/portador/:id', PortadorController.atualizar);
router.delete('/portador/:id', PortadorController.deletar);

export default router;