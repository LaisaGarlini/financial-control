import { CategoriaDTO } from '@/dto/categoria.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const CategoriaService = {
    async getCategorias(): Promise<CategoriaDTO[]> {
        const { data } = await ApiControleFinanceiro.get<CategoriaDTO[]>('/categoria')
        return data
    },
    async criar(categoria: Omit<CategoriaDTO, 'id'>): Promise<CategoriaDTO> {
        const { data } = await ApiControleFinanceiro.post<CategoriaDTO>('/categoria', {
            data: categoria,
        })
        return data
    },
}
