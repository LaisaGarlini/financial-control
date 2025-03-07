import { Request, Response } from 'express'
import { CategoriaRepository } from '../repositories/categoria.repository'

class CategoriaController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await CategoriaRepository.GetCategorias()
            if (categorias.length === 0) {
                res.status(404).json({ message: 'Nenhuma categoria encontrada.' })
                return
            }
            res.json(categorias)
        } catch (error) {
            console.error('Erro ao listar categorias:', error)
            res.status(500).json({
                message: 'Erro interno ao listar categorias.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const categoria = await CategoriaRepository.GetCategoriaById(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }
            res.json(categoria)
        } catch (error) {
            console.error('Erro ao buscar categoria por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, nome, ativo } = req.body

            if (!usuario_id || !nome || ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "nome" e "ativo" são obrigatórios.',
                })
                return
            }

            const novaCategoria = await CategoriaRepository.Create({ usuario_id, nome, ativo })
            res.status(201).json({
                message: 'Categoria criada com sucesso.',
                data: novaCategoria,
            })
        } catch (error) {
            console.error('Erro ao criar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao criar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, nome, ativo } = req.body

            if (!usuario_id && !nome && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "nome" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const categoria = await CategoriaRepository.GetCategoriaById(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }

            await CategoriaRepository.Update({ id: +id, usuario_id, nome, ativo })
            res.json({
                message: 'Categoria atualizada com sucesso.',
                data: categoria,
            })
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const categoria = await CategoriaRepository.Delete(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Categoria deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new CategoriaController()
