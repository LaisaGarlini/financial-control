import express from 'express'
import movimentoFinanceiroController from '../controllers/movimentoFinanceiroController'

const router = express.Router()

router.get('/movimento_financeiro', movimentoFinanceiroController.listar)
router.get('/movimento_financeiro/:id', movimentoFinanceiroController.buscarPorId)
router.post('/movimento_financeiro', movimentoFinanceiroController.criar)
router.put('/movimento_financeiro/:id', movimentoFinanceiroController.atualizar)
router.delete('/movimento_financeiro/:id', movimentoFinanceiroController.deletar)

export default router
