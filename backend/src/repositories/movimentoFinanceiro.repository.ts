import { MovimentoFinanceiroDTO } from '../dto/movimento_financeiro.dto'
import { MovimentoFinanceiro } from '../models/movimento_financeiro'

export const MovimentoFinanceiroRepository = {
    async GetMovimentoFinanceiros(): Promise<MovimentoFinanceiroDTO[]> {
        return await MovimentoFinanceiro.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async GetMovimentoFinanceiroById(id: number): Promise<MovimentoFinanceiroDTO | null> {
        return await MovimentoFinanceiro.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async Create(data: Omit<MovimentoFinanceiroDTO, 'id'>): Promise<MovimentoFinanceiroDTO> {
        return await MovimentoFinanceiro.create({
            usuario_id: data.usuario_id,
            descricao: data.descricao,
            subcategoria_id: data.subcategoria_id,
            pessoa_id: data.pessoa_id,
            situacao: data.situacao,
            valor_bruto: data.valor_bruto,
            valor_pago: data.valor_pago || null,
            data_vencimento: data.data_vencimento,
            data_pagamento: data.data_pagamento || null,
            previsao: data.previsao || false,
            observacao: data.observacao || null,
            data_cadastro: new Date(),
        })
    },

    async Update(data: Omit<MovimentoFinanceiroDTO, 'data_cadastro'>): Promise<boolean> {
        const movimento_financeiro = await MovimentoFinanceiro.findByPk(data.id)

        if (movimento_financeiro) {
            await movimento_financeiro.update({
                usuario_id: data.usuario_id,
                descricao: data.descricao,
                subcategoria_id: data.subcategoria_id,
                pessoa_id: data.pessoa_id,
                situacao: data.situacao,
                valor_bruto: data.valor_bruto,
                valor_pago: data.valor_pago,
                data_vencimento: data.data_vencimento,
                data_pagamento: data.data_pagamento,
                previsao: data.previsao,
                observacao: data.observacao,
            })
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const movimento_financeiro = await MovimentoFinanceiro.findByPk(id)

        if (movimento_financeiro) {
            await movimento_financeiro.destroy()
            return true // Retorna true se a exclusão for bem-sucedida
        }

        return false // Retorna false se o movimento financeiro não for encontrado
    },
}
