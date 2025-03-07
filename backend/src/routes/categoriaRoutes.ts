import express from 'express'
import CategoriaController from '../controllers/categoriaController'

const router = express.Router()

router.get('/categoria', CategoriaController.listar)
router.get('/categoria/:id', CategoriaController.buscarPorId)
router.post('/categoria', CategoriaController.criar)
router.put('/categoria/:id', CategoriaController.atualizar)
router.delete('/categoria/:id', CategoriaController.deletar)

export default router
