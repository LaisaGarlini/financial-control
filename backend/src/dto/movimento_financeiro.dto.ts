export interface MovimentoFinanceiroDTO {
    id?: number
    usuario_id: number
    descricao: string
    subcategoria_id: number
    pessoa_id?: number
    situacao: number
    valor_bruto: number
    valor_pago?: number
    data_vencimento: Date
    data_pagamento?: Date
    previsao?: boolean
    observacao?: string
    data_cadastro?: Date
}
