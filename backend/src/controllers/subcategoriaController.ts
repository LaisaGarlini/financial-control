import { Request, Response } from 'express'
import { SubcategoriaRepository } from '../repositories/subcategoria.repository'

class SubcategoriaController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const subcategorias = await SubcategoriaRepository.GetSubcategorias()
            if (subcategorias.length === 0) {
                res.status(404).json({ message: 'Nenhuma subcategoria encontrada.' })
                return
            }
            res.json(subcategorias)
        } catch (error) {
            console.error('Erro ao listar subcategorias:', error)
            res.status(500).json({
                message: 'Erro interno ao listar subcategorias.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const subcategoria = await SubcategoriaRepository.GetSubcategoriaById(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }
            res.json(subcategoria)
        } catch (error) {
            console.error('Erro ao buscar subcategoria por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, nome, categoria_id, tipo, ativo } = req.body

            if (!usuario_id || !nome || !categoria_id || tipo === undefined || ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "nome", "categoria_id", "tipo" e "ativo" são obrigatórios.',
                })
                return
            }

            const novaSubcategoria = await SubcategoriaRepository.Create({ usuario_id, nome, categoria_id, tipo, ativo })
            res.status(201).json({
                message: 'Subcategoria criada com sucesso.',
                data: novaSubcategoria,
            })
        } catch (error) {
            console.error('Erro ao criar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao criar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, nome, categoria_id, tipo, ativo } = req.body

            if (!usuario_id && !nome && !categoria_id && tipo === undefined && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "nome", "categoria_id", "tipo" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const subcategoria = await SubcategoriaRepository.GetSubcategoriaById(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }

            await SubcategoriaRepository.Update({ id: +id, usuario_id, nome, categoria_id, tipo, ativo })
            res.json({
                message: 'Subcategoria atualizada com sucesso.',
                data: subcategoria,
            })
        } catch (error) {
            console.error('Erro ao atualizar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const subcategoria = await SubcategoriaRepository.Delete(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Subcategoria deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new SubcategoriaController()
