import { Request, Response } from 'express';
import PortadorCartao from '../models/portador_cartao';

class PortadorCartaoController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const portadores_cartoes = await PortadorCartao.findAll();
            if (portadores_cartoes.length === 0) {
                res.status(404).json({ message: 'Nenhum portador cartão encontrado.' });
                return;
            }
            res.json(portadores_cartoes);
        } catch (error) {
            console.error('Erro ao listar portador cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao listar portador cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const portadores_cartoes = await PortadorCartao.findByPk(id);
            if (!portadores_cartoes) {
                res.status(404).json({ message: `Portador cartão com ID ${id} não encontrado.` });
                return;
            }
            res.json(portadores_cartoes);
        } catch (error) {
            console.error('Erro ao buscar portador cartão por ID:', error);
            res.status(500).json({ 
                message: 'Erro interno ao buscar portador cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, portador_id, cartao_id } = req.body;
    
            if (!usuario_id || !portador_id || !cartao_id) {
                res.status(400).json({ 
                    message: 'Os campos "usuario_id", "portador_id" e "cartao_id" são obrigatórios.' 
                });
                return;
            }
    
            const novoPortadorCartao = await PortadorCartao.create({ usuario_id, portador_id, cartao_id });
            res.status(201).json({ 
                message: 'Portador cartão criada com sucesso.',
                data: novoPortadorCartao,
            });
        } catch (error) {
            console.error('Erro ao criar portador cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao criar portador cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { usuario_id, portador_id, cartao_id } = req.body;
    
            if (!usuario_id && !portador_id && !cartao_id) {
                res.status(400).json({ 
                    message: 'Pelo menos um dos campos "usuario_id", "portador_id" e "cartao_id" deve ser fornecido.' 
                });
                return;
            }
    
            const portadores_cartoes = await PortadorCartao.findByPk(id);
            if (!portadores_cartoes) {
                res.status(404).json({ message: `Portador cartão com ID ${id} não encontrado.` });
                return;
            }
    
            await portadores_cartoes.update({ usuario_id, portador_id, cartao_id });
            res.json({ 
                message: 'Portador cartão atualizado com sucesso.',
                data: portadores_cartoes,
            });
        } catch (error) {
            console.error('Erro ao atualizar portador cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao atualizar portador cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const portadores_cartoes = await PortadorCartao.findByPk(id);
            if (!portadores_cartoes) {
                res.status(404).json({ message: `Portador cartão com ID ${id} não encontrado.` });
                return;
            }
            await portadores_cartoes.destroy();
            res.json({ message: 'Portador cartão deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar portador cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao deletar portador cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }
}

export default new PortadorCartaoController();