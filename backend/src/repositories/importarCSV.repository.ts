import { MovimentoFinanceiroDTO } from '../dto/movimento_financeiro.dto'
import { MovimentoFinanceiro } from '../models/movimento_financeiro'
import { formatarData, formatarValor } from '../utils/utils'

const mapearSituacao = (situacao: number): string => {
    return situacao === 1 ? 'Pago' : 'Pendente'
}

export const ImportarCSVRepository = {
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
}
