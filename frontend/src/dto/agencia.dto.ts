export interface AgenciaDTO {
    id: number | string
    usuario_id: number
    banco_id: number
    banco: {
        nome: string
    }
    agencia: string
    ativo: boolean
}
