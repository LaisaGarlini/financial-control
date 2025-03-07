import express from 'express'
import SubcategoriaController from '../controllers/subcategoriaController'

const router = express.Router()

router.get('/subcategoria', SubcategoriaController.listar)
router.get('/subcategoria/:id', SubcategoriaController.buscarPorId)
router.post('/subcategoria', SubcategoriaController.criar)
router.put('/subcategoria/:id', SubcategoriaController.atualizar)
router.delete('/subcategoria/:id', SubcategoriaController.deletar)

export default router
