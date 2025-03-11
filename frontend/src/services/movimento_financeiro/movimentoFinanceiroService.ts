import { MovimentoFinanceiroDTO } from '@/dto/movimentoFinanceiro.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const MovimentoFinanceiroService = {
    async getMovimentosFinanceiro(): Promise<MovimentoFinanceiroDTO[]> {
        const { data } = await ApiControleFinanceiro.get<MovimentoFinanceiroDTO[]>('/movimento_financeiro')
        return data
    },
    async criar(movimento_financeiro: Omit<MovimentoFinanceiroDTO, 'id'>): Promise<MovimentoFinanceiroDTO> {
        const { data } = await ApiControleFinanceiro.post<MovimentoFinanceiroDTO>('/movimento_financeiro', {
            data: movimento_financeiro,
        })
        return data
    },
}
