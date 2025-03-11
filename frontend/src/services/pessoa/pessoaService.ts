import { PessoaDTO } from '@/dto/pessoa.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const PessoaService = {
    async getPessoas(): Promise<PessoaDTO[]> {
        const { data } = await ApiControleFinanceiro.get<PessoaDTO[]>('/pessoa')
        return data
    },
    async criar(pessoa: Omit<PessoaDTO, 'id'>): Promise<PessoaDTO> {
        const { data } = await ApiControleFinanceiro.post<PessoaDTO>('/pessoa', {
            data: pessoa,
        })
        return data
    },
}
