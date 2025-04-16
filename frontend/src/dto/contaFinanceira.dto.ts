export type ContaFinanceiraDTO = {
    agencia_id: number
    agencium: {
        agencia: string
        banco: {
            id: number
            nome: string
        }
    }
    ativo: boolean
    id: number
    nome: string
    numero: string
    tipo: number
    usuario_id: number
}
