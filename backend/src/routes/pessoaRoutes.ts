import express from 'express'
import PessoaController from '../controllers/pessoaController'

const router = express.Router()

router.get('/pessoa', PessoaController.listar)
router.get('/pessoa/:id', PessoaController.buscarPorId)
router.post('/pessoa', PessoaController.criar)
router.put('/pessoa/:id', PessoaController.atualizar)
router.delete('/pessoa/:id', PessoaController.deletar)

export default router
