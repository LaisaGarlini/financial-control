import { Request, Response } from 'express'
import { BancoRepository } from '../repositories/banco.repository'

class BancoController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const bancos = await BancoRepository.GetBancos()
            if (bancos.length === 0) {
                res.status(404).json({ message: 'Nenhum banco encontrado.' })
                return
            }
            res.json(bancos)
        } catch (error) {
            console.error('Erro ao listar bancos:', error)
            res.status(500).json({
                message: 'Erro interno ao listar bancos.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const banco = await BancoRepository.GetBancoById(+id)
            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrado.` })
                return
            }
            res.json(banco)
        } catch (error) {
            console.error('Erro ao buscar banco por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { id, nome, usuario_id, ativo } = req.body

            if (!nome || !usuario_id) {
                res.status(400).json({
                    message: 'Os campos "nome" e "usuario_id" são obrigatórios.',
                })
                return
            }

            if (id) {
                const bancoExistente = await BancoRepository.GetBancoById(id)
                if (bancoExistente) {
                    res.status(400).json({ message: `Já existe um banco com o ID ${id}.` })
                    return
                }
            }

            const novoBanco = await BancoRepository.Create({ id, nome, usuario_id, ativo })
            res.status(201).json({
                message: 'Banco criado com sucesso.',
                data: novoBanco,
            })
        } catch (error) {
            console.error('Erro ao criar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao criar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { nome, usuario_id, ativo } = req.body

            if (!nome && !usuario_id && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "nome", "usuario_id" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const banco = await BancoRepository.Update({ nome, usuario_id, ativo })

            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrado.` })
                return
            }

            res.json({
                message: 'Banco atualizado com sucesso.',
                data: banco,
            })
        } catch (error) {
            console.error('Erro ao atualizar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const banco = await BancoRepository.Delete(+id)

            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrado.` })
                return
            }

            res.json({ message: 'Banco deletado com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new BancoController()
