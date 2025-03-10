export interface PessoaDTO {
    id?: number
    usuario_id: number
    razao_social: string
    nome_fantasia?: string
    natureza: string
    cpf_cnpj: string
    ie_rg?: string
    observacao?: string
    ativo?: boolean
    data_cadastro: Date
}
