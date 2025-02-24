import express from 'express';
import UsuarioController from '../controllers/usuarioController'

const router = express.Router();

router.get('/usuario', UsuarioController.listar);
router.get('/usuario/:id', UsuarioController.buscarPorId);
router.post('/usuario', UsuarioController.criar);
// router.put('/banco/:id', UsuarioController.atualizar);
router.delete('/usuario/:id', UsuarioController.deletar);

export default router;