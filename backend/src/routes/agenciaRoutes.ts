import express from 'express';
import AgenciaController from '../controllers/agenciaController'

const router = express.Router();

router.get('/agencia', AgenciaController.listar);
router.get('/agencia/:id', AgenciaController.buscarPorId);
router.post('/agencia', AgenciaController.criar);
router.put('/agencia/:id', AgenciaController.atualizar);
router.delete('/agencia/:id', AgenciaController.deletar);

export default router;