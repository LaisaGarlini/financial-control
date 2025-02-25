import { Request, Response } from 'express';
import Cartao from '../models/cartao';

class CartaoController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const cartoes = await Cartao.findAll();
            if (cartoes.length === 0) {
                res.status(404).json({ message: 'Nenhum cartão encontrado.' });
                return;
            }
            res.json(cartoes);
        } catch (error) {
            console.error('Erro ao listar cartões:', error);
            res.status(500).json({ 
                message: 'Erro interno ao listar cartões.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cartoes = await Cartao.findByPk(id);
            if (!cartoes) {
                res.status(404).json({ message: `Cartão com ID ${id} não encontrad.` });
                return;
            }
            res.json(cartoes);
        } catch (error) {
            console.error('Erro ao buscar cartão por ID:', error);
            res.status(500).json({ 
                message: 'Erro interno ao buscar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, conta_financeira_id, apelido, tipo, ativo } = req.body;
    
            if (!usuario_id || !conta_financeira_id || !apelido || !tipo || !ativo) {
                res.status(400).json({ 
                    message: 'Os campos "usuario_id", "conta_financeira_id", "apelido", "tipo" e "ativo" são obrigatórios.' 
                });
                return;
            }
    
            const novoCartao = await Cartao.create({ usuario_id, conta_financeira_id, apelido, tipo, ativo });
            res.status(201).json({ 
                message: 'cartão criada com sucesso.',
                data: novoCartao,
            });
        } catch (error) {
            console.error('Erro ao criar cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao criar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { usuario_id, conta_financeira_id, apelido, tipo, ativo } = req.body;
    
            if (!usuario_id && !conta_financeira_id && !apelido && !tipo && !ativo === undefined) {
                res.status(400).json({ 
                    message: 'Pelo menos um dos campos "usuario_id", "conta_financeira_id", "apelido", "tipo" ou "ativo" deve ser fornecido.' 
                });
                return;
            }
    
            const cartao = await Cartao.findByPk(id);
            if (!cartao) {
                res.status(404).json({ message: `cartão com ID ${id} não encontrado.` });
                return;
            }
    
            await cartao.update({ usuario_id, conta_financeira_id, apelido, tipo, ativo });
            res.json({ 
                message: 'Cartão atualizado com sucesso.',
                data: cartao,
            });
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao atualizar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cartao = await Cartao.findByPk(id);
            if (!cartao) {
                res.status(404).json({ message: `Cartão com ID ${id} não encontrado.` });
                return;
            }
            await cartao.destroy();
            res.json({ message: 'Cartão deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar cartão:', error);
            res.status(500).json({ 
                message: 'Erro interno ao deletar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }
}

export default new CartaoController();