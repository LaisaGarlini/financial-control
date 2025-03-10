import { Request, Response } from 'express'
import { PessoaRepository } from '../repositories/pessoa.repository'

class PessoaController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const pessoas = await PessoaRepository.GetPessoas()
            if (pessoas.length === 0) {
                res.status(404).json({ message: 'Nenhuma pessoa encontrada.' })
                return
            }
            res.json(pessoas)
        } catch (error) {
            console.error('Erro ao listar pessoas:', error)
            res.status(500).json({
                message: 'Erro interno ao listar pessoas.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const pessoa = await PessoaRepository.GetPessoaById(+id)
            if (!pessoa) {
                res.status(404).json({ message: `Pessoa com ID ${id} não encontrada.` })
                return
            }
            res.json(pessoa)
        } catch (error) {
            console.error('Erro ao buscar pessoa por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar pessoa.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, razao_social, nome_fantasia, natureza, cpf_cnpj, ie_rg, observacao, ativo } = req.body

            if (!usuario_id || !razao_social || !natureza || !cpf_cnpj || ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "razao_social", "natureza" e "cpf_cnpj" são obrigatórios.',
                })
                return
            }

            const novaPessoa = await PessoaRepository.Create({
                usuario_id,
                razao_social,
                nome_fantasia,
                natureza,
                cpf_cnpj,
                ie_rg,
                observacao,
                ativo,
                data_cadastro: new Date(),
            })
            res.status(201).json({
                message: 'Pessoa criada com sucesso.',
                data: novaPessoa,
            })
        } catch (error) {
            console.error('Erro ao criar pessoa:', error)
            res.status(500).json({
                message: 'Erro interno ao criar pessoa.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, razao_social, nome_fantasia, natureza, cpf_cnpj, ie_rg, observacao, ativo } = req.body

            if (
                !usuario_id &&
                !razao_social &&
                !nome_fantasia &&
                !natureza &&
                !cpf_cnpj &&
                ie_rg === undefined &&
                observacao === undefined &&
                ativo === undefined
            ) {
                res.status(400).json({
                    message:
                        'Pelo menos um dos campos "usuario_id", "razao_social", "nome_fantasia", "natureza", "cpf_cnpj", "ie_rg", "observacao" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const pessoa = await PessoaRepository.GetPessoaById(+id)
            if (!pessoa) {
                res.status(404).json({ message: `Pessoa com ID ${id} não encontrada.` })
                return
            }

            await PessoaRepository.Update({
                id: +id,
                usuario_id: usuario_id !== undefined ? usuario_id : pessoa.usuario_id,
                razao_social: razao_social !== undefined ? razao_social : pessoa.razao_social,
                nome_fantasia: nome_fantasia !== undefined ? nome_fantasia : pessoa.nome_fantasia,
                natureza: natureza !== undefined ? natureza : pessoa.natureza,
                cpf_cnpj: cpf_cnpj !== undefined ? cpf_cnpj : pessoa.cpf_cnpj,
                ie_rg: ie_rg !== undefined ? ie_rg : pessoa.ie_rg,
                observacao: observacao !== undefined ? observacao : pessoa.observacao,
                ativo: ativo !== undefined ? ativo : pessoa.ativo,
            })
            res.json({
                message: 'Pessoa atualizada com sucesso.',
                data: pessoa,
            })
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar pessoa.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const pessoa = await PessoaRepository.Delete(+id)
            if (!pessoa) {
                res.status(404).json({ message: `Pessoa com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Pessoa deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar pessoa.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new PessoaController()
