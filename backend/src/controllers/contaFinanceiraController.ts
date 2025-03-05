import { Request, Response } from 'express'
import { ContaFinanceiraRepository } from '../repositories/contaFinanceira.repository'

class ContaFinanceiraController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const contas_financeiras = await ContaFinanceiraRepository.GetContasFinanceira()
            if (contas_financeiras.length === 0) {
                res.status(404).json({ message: 'Nenhuma conta financeira encontrada.' })
                return
            }
            res.json(contas_financeiras)
        } catch (error) {
            console.error('Erro ao listar contas financeiras:', error)
            res.status(500).json({
                message: 'Erro interno ao listar contas financeiras.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const contas_financeiras = await ContaFinanceiraRepository.GetContaFinanceiraById(+id)
            if (!contas_financeiras) {
                res.status(404).json({ message: `Conta financeira com ID ${id} não encontrada.` })
                return
            }
            res.json(contas_financeiras)
        } catch (error) {
            console.error('Erro ao buscar conta financeira por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, agencia_id, nome, numero, tipo, ativo } = req.body

            if (!usuario_id || !agencia_id || !nome || !numero || !tipo || !ativo) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "agencia_id", "nome", "numero", "tipo" e "ativo" são obrigatórios.',
                })
                return
            }

            const novaContaFinanceira = await ContaFinanceiraRepository.Create({ usuario_id, agencia_id, nome, numero, tipo, ativo })
            res.status(201).json({
                message: 'Conta financeira criada com sucesso.',
                data: novaContaFinanceira,
            })
        } catch (error) {
            console.error('Erro ao criar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao criar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, agencia_id, nome, numero, tipo, ativo } = req.body

            if (!usuario_id && !agencia_id && !nome && !numero && !tipo && !ativo) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "agencia_id", "nome", "numero", "tipo" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const conta_financeira = await ContaFinanceiraRepository.Update({ id: +id, nome, usuario_id, ativo })
            if (!conta_financeira) {
                res.status(404).json({ message: `Conta Financeira com ID ${id} não encontrado.` })
                return
            }

            res.json({
                message: 'Conta Financeira atualizado com sucesso.',
                data: conta_financeira,
            })
        } catch (error) {
            console.error('Erro ao atualizar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const conta_financeira_removida = await ContaFinanceiraRepository.Delete(+id)
            if (!conta_financeira_removida) {
                res.status(404).json({ message: `Conta Financeira com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Conta Financeira deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new ContaFinanceiraController()
