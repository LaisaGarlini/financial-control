import { Request, Response } from 'express'
import { UsuarioRepository } from '../repositories/usuario.repository'

class UsuarioController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await UsuarioRepository.GetUsuarios()
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const usuario = await UsuarioRepository.GetUsuarioById(+id)
            if (!usuario) {
                res.status(404).json({ error: 'Usuário não encontrado' })
                return
            }
            res.json(usuario)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { nome } = req.body

            if (!nome) {
                res.status(400).json({
                    message: 'Os campos "nome" são obrigatórios.',
                })
                return
            }
            const novoUsuario = await UsuarioRepository.Create({ nome })
            res.status(201).json({
                message: 'Usuário criado com sucesso.',
                data: novoUsuario,
            })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' })
        }
    }

    // async atualizar(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params
    //         const usuario = await Usuario.findByPk(id)
    //         if (!usuario) {
    //             res.status(404).json({ error: 'Usuário não encontrado' })
    //             return
    //         }
    //         await Usuario.update({ })
    //         res.json(Usuario)
    //     } catch (error) {
    //         res.status(500).json({ error: 'Erro ao atualizar usuário' })
    //     }
    // }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const usuario = await UsuarioRepository.Delete(+id)
            if (!usuario) {
                res.status(404).json({ error: 'Usuario não encontrado' })
                return
            }
            res.json({ message: 'Usuario deletado com sucesso' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar Usuario' })
        }
    }
}

export default new UsuarioController()
