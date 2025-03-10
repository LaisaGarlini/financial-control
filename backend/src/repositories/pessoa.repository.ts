import { PessoaDTO } from '../dto/pessoa.dto'
import { Pessoa } from '../models/pessoa'

export const PessoaRepository = {
    async GetPessoas(): Promise<PessoaDTO[]> {
        return await Pessoa.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async GetPessoaById(id: number): Promise<PessoaDTO | null> {
        return await Pessoa.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async Create(data: Omit<PessoaDTO, 'id'>): Promise<PessoaDTO> {
        return await Pessoa.create({
            usuario_id: data.usuario_id,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            natureza: data.natureza,
            cpf_cnpj: data.cpf_cnpj,
            ie_rg: data.ie_rg,
            observacao: data.observacao,
            ativo: data.ativo,
            data_cadastro: data.data_cadastro,
        })
    },

    // (pessoaData: Omit<PessoaDTO, 'data_cadastro'>): Promise<[number, Pessoa[]]> {
    async Update(data: Omit<PessoaDTO, 'data_cadastro'>): Promise<boolean> {
        const pessoa = await Pessoa.findByPk(data.id)

        if (pessoa) {
            await pessoa.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const pessoa = await Pessoa.findByPk(id)

        if (pessoa) {
            await pessoa.destroy()
            return true
        }

        return false
    },
}
