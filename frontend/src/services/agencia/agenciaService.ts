import { AgenciaDTO } from '@/dto/agencia.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const AgenciaService = {
    async getAgencias(): Promise<AgenciaDTO[]> {
        const { data } = await ApiControleFinanceiro.get<AgenciaDTO[]>('/agencia')
        return data
    },
    async criar(agencia: Omit<AgenciaDTO, 'id'>): Promise<AgenciaDTO> {
        const { data } = await ApiControleFinanceiro.post<AgenciaDTO>('/agencia', {
            data: agencia,
        })
        return data
    },
}
