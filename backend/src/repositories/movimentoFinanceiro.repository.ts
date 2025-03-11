import { MovimentoFinanceiroDTO } from '../dto/movimento_financeiro.dto'
import { MovimentoFinanceiro } from '../models/movimento_financeiro'
import { Pessoa } from '../models/pessoa'
import { SubCategoria } from '../models/subcategoria'
import { formatarData, formatarValor } from '../utils/utils'

const mapearSituacao = (situacao: number): string => {
    return situacao === 1 ? 'Pago' : 'Pendente'
}

export const MovimentoFinanceiroRepository = {
    async GetMovimentoFinanceiros(): Promise<MovimentoFinanceiroDTO[]> {
        const movimentos = await MovimentoFinanceiro.findAll({
            include: [
                {
                    model: Pessoa,
                    attributes: ['razao_social'],
                },
                {
                    model: SubCategoria,
                    attributes: ['nome', 'tipo'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        return movimentos.map((movimento) => ({
            ...movimento.get({ plain: true }),
            situacao: mapearSituacao(movimento.situacao),
            valor_bruto: formatarValor(movimento.valor_bruto),
            valor_pago: movimento.valor_pago ? formatarValor(movimento.valor_pago) : null,
            data_vencimento: formatarData(movimento.data_vencimento),
            data_pagamento: movimento.data_pagamento ? formatarData(movimento.data_pagamento) : null,
        }))
    },

    async GetMovimentoFinanceiroById(id: number): Promise<MovimentoFinanceiroDTO | null> {
        const movimento = await MovimentoFinanceiro.findByPk(id, {
            include: [
                {
                    model: Pessoa,
                    attributes: ['razao_social'],
                },
                {
                    model: SubCategoria,
                    attributes: ['nome', 'tipo'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        if (movimento) {
            return {
                ...movimento.get({ plain: true }),
                situacao: mapearSituacao(movimento.situacao),
                valor_bruto: formatarValor(movimento.valor_bruto),
                valor_pago: movimento.valor_pago ? formatarValor(movimento.valor_pago) : null,
                data_vencimento: formatarData(movimento.data_vencimento),
                data_pagamento: movimento.data_pagamento ? formatarData(movimento.data_pagamento) : null,
            }
        }

        return null
    },

    async Create(data: Omit<MovimentoFinanceiroDTO, 'id'>): Promise<MovimentoFinanceiroDTO> {
        const movimento = await MovimentoFinanceiro.create({
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

        return {
            ...movimento.get({ plain: true }),
            situacao: mapearSituacao(movimento.situacao),
            valor_bruto: formatarValor(movimento.valor_bruto),
            valor_pago: movimento.valor_pago ? formatarValor(movimento.valor_pago) : null,
            data_vencimento: formatarData(movimento.data_vencimento),
            data_pagamento: movimento.data_pagamento ? formatarData(movimento.data_pagamento) : null,
        }
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
            return true
        }

        return false
    },
}
