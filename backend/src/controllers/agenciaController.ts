import { Request, Response } from 'express'
import { AgenciaRepository } from '../repositories/agencia.repository'

class AgenciaController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const agencias = await AgenciaRepository.GetAgencias()
            if (agencias.length === 0) {
                res.status(404).json({ message: 'Nenhuma agência encontrada.' })
                return
            }
            res.json(agencias)
        } catch (error) {
            console.error('Erro ao listar agencias:', error)
            res.status(500).json({
                message: 'Erro interno ao listar agências.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const agencia = await AgenciaRepository.GetAgenciaById(+id)
            if (!agencia) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrada.` })
                return
            }
            res.json(agencia)
        } catch (error) {
            console.error('Erro ao buscar agência por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, banco_id, agencia, ativo } = req.body

            if (!usuario_id || !banco_id || !agencia || !ativo) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "banco_id", "agencia" e "ativo" são obrigatórios.',
                })
                return
            }

            const novaAgencia = await AgenciaRepository.Create({ usuario_id, banco_id, agencia, ativo })
            res.status(201).json({
                message: 'Agência criada com sucesso.',
                data: novaAgencia,
            })
        } catch (error) {
            console.error('Erro ao criar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao criar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, banco_id, agencia, ativo } = req.body

            if (!usuario_id && !banco_id && !agencia && !ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "banco_id", "agencia" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const agenciaa = await AgenciaRepository.GetAgenciaById(+id)
            if (!agenciaa) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrado.` })
                return
            }

            await AgenciaRepository.Update({ usuario_id, banco_id, agencia, ativo })
            res.json({
                message: 'Agência atualizado com sucesso.',
                data: agenciaa,
            })
        } catch (error) {
            console.error('Erro ao atualizar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const agencia = await AgenciaRepository.Delete(+id)
            if (!agencia) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Agência deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new AgenciaController()
