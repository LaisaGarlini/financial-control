import { Request, Response } from 'express'
import { MovimentoFinanceiroRepository } from '../repositories/movimentoFinanceiro.repository'

class MovimentoFinanceiroController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const movimentos = await MovimentoFinanceiroRepository.GetMovimentoFinanceiros()
            if (movimentos.length === 0) {
                res.status(404).json({ message: 'Nenhum movimento financeiro encontrado.' })
                return
            }
            res.json(movimentos)
        } catch (error) {
            console.error('Erro ao listar movimentos:', error)
            res.status(500).json({
                message: 'Erro interno ao listar movimentos.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const movimento = await MovimentoFinanceiroRepository.GetMovimentoFinanceiroById(+id)
            if (!movimento) {
                res.status(404).json({ message: `Movimento financeiro com ID ${id} não encontrado.` })
                return
            }
            res.json(movimento)
        } catch (error) {
            console.error('Erro ao buscar movimento financeiro por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar movimento financeiro.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const {
                usuario_id,
                descricao,
                subcategoria_id,
                pessoa_id,
                situacao,
                valor_bruto,
                valor_pago,
                data_vencimento,
                data_pagamento,
                previsao,
                observacao,
            } = req.body

            if (!usuario_id || !descricao || !subcategoria_id || !pessoa_id || !situacao || !valor_bruto || !data_vencimento) {
                res.status(400).json({
                    message:
                        'Os campos "usuario_id", "descricao", "subcategoria_id", "pessoa_id", "situacao", "valor_bruto" e "data_vencimento" são obrigatórios.',
                })
                return
            }

            const novoMovimentoFinanceiro = await MovimentoFinanceiroRepository.Create({
                usuario_id,
                descricao,
                subcategoria_id,
                pessoa_id,
                situacao,
                valor_bruto,
                valor_pago: valor_pago || null,
                data_vencimento,
                data_pagamento: data_pagamento || null,
                previsao: previsao || false,
                observacao: observacao || null,
                data_cadastro: new Date(),
            })

            res.status(201).json({
                message: 'Movimento Financeiro criado com sucesso.',
                data: novoMovimentoFinanceiro,
            })
        } catch (error) {
            console.error('Erro ao criar movimento financeiro:', error)
            res.status(500).json({
                message: 'Erro interno ao criar movimento financeiro.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const {
                usuario_id,
                descricao,
                subcategoria_id,
                pessoa_id,
                situacao,
                valor_bruto,
                valor_pago,
                data_vencimento,
                data_pagamento,
                previsao,
                observacao,
            } = req.body

            if (
                !usuario_id &&
                !descricao &&
                !subcategoria_id &&
                !pessoa_id &&
                !situacao &&
                !valor_bruto &&
                !valor_pago &&
                !data_vencimento &&
                !data_pagamento &&
                previsao === undefined &&
                !observacao
            ) {
                res.status(400).json({
                    message:
                        'Pelo menos um dos campos "usuario_id", "descricao", "subcategoria_id", "pessoa_id", "situacao", "valor_bruto", "valor_pago", "data_vencimento", "data_pagamento", "previsao" ou "observacao" deve ser fornecido.',
                })
                return
            }

            const movimento = await MovimentoFinanceiroRepository.GetMovimentoFinanceiroById(+id)
            if (!movimento) {
                res.status(404).json({ message: `Movimento Financeiro com ID ${id} não encontrado.` })
                return
            }

            await MovimentoFinanceiroRepository.Update({
                id: +id,
                usuario_id: usuario_id !== undefined ? usuario_id : movimento.usuario_id,
                descricao: descricao !== undefined ? descricao : movimento.descricao,
                subcategoria_id: subcategoria_id !== undefined ? subcategoria_id : movimento.subcategoria_id,
                pessoa_id: pessoa_id !== undefined ? pessoa_id : movimento.pessoa_id,
                situacao: situacao !== undefined ? situacao : movimento.situacao,
                valor_bruto: valor_bruto !== undefined ? valor_bruto : movimento.valor_bruto,
                valor_pago: valor_pago !== undefined ? valor_pago : movimento.valor_pago,
                data_vencimento: data_vencimento !== undefined ? data_vencimento : movimento.data_vencimento,
                data_pagamento: data_pagamento !== undefined ? data_pagamento : movimento.data_pagamento,
                previsao: previsao !== undefined ? previsao : movimento.previsao,
                observacao: observacao !== undefined ? observacao : movimento.observacao,
            })

            res.json({
                message: 'Movimento Financeiro atualizado com sucesso.',
                data: movimento,
            })
        } catch (error) {
            console.error('Erro ao atualizar movimento financeiro:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar movimento financeiro.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const movimento = await MovimentoFinanceiroRepository.Delete(+id)
            if (!movimento) {
                res.status(404).json({ message: `Movimento Financeiro com ID ${id} não encontrado.` })
                return
            }
            res.json({ message: 'Movimento Financeiro deletado com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar movimento financeiro:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar movimento financeiro.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new MovimentoFinanceiroController()
