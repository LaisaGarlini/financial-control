import { ContaFinanceiraDTO } from '@/dto/contaFinanceira.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const ContaService = {
    async getContaFinanceira(): Promise<ContaFinanceiraDTO[]> {
        const { data } = await ApiControleFinanceiro.get<ContaFinanceiraDTO[]>('/conta_financeira')
        return data
    },
}
