import { BancoDTO } from '@/dto/banco.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const BancoService = {
    async getAgencias(): Promise<BancoDTO[]> {
        const { data } = await ApiControleFinanceiro.get<BancoDTO[]>('/banco')
        return data
    },
}
