import { Request, Response } from 'express';
import Portador from '../models/portador';

class PortadorController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const portadores = await Portador.findAll();
            if (portadores.length === 0) {
                res.status(404).json({ message: 'Nenhum portador encontrado.' });
                return;
            }
            res.json(portadores);
        } catch (error) {
            console.error('Erro ao listar portadores:', error);
            res.status(500).json({ 
                message: 'Erro interno ao listar portadores.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const portadores = await Portador.findByPk(id);
            if (!portadores) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrad.` });
                return;
            }
            res.json(portadores);
        } catch (error) {
            console.error('Erro ao buscar portador por ID:', error);
            res.status(500).json({ 
                message: 'Erro interno ao buscar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, conta_financeira_id, nome, tipo, ativo } = req.body;
    
            if (!usuario_id || !conta_financeira_id || !nome || !tipo || !ativo) {
                res.status(400).json({ 
                    message: 'Os campos "usuario_id", "conta_financeira_id", "nome", "tipo" e "ativo" são obrigatórios.' 
                });
                return;
            }
    
            const novoPortador = await Portador.create({ usuario_id, conta_financeira_id, nome, tipo, ativo });
            res.status(201).json({ 
                message: 'Portador criado com sucesso.',
                data: novoPortador,
            });
        } catch (error) {
            console.error('Erro ao criar portador:', error);
            res.status(500).json({ 
                message: 'Erro interno ao criar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { usuario_id, conta_financeira_id, nome, tipo, ativo } = req.body;
    
            if (!usuario_id && !conta_financeira_id && !nome && !tipo && !ativo) {
                res.status(400).json({ 
                    message: 'Pelo menos um dos campos "usuario_id", "conta_financeira_id", "nome", "tipo" ou "ativo" deve ser fornecido.' 
                });
                return;
            }
    
            const portador = await Portador.findByPk(id);
            if (!portador) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrado.` });
                return;
            }
    
            await portador.update({ nome, usuario_id, ativo });
            res.json({ 
                message: 'Portador atualizado com sucesso.',
                data: portador,
            });
        } catch (error) {
            console.error('Erro ao atualizar portador:', error);
            res.status(500).json({ 
                message: 'Erro interno ao atualizar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const portador = await Portador.findByPk(id);
            if (!portador) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrada.` });
                return;
            }
            await portador.destroy();
            res.json({ message: 'Portador deletada com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar portador:', error);
            res.status(500).json({ 
                message: 'Erro interno ao deletar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            });
        }
    }
}

export default new PortadorController();