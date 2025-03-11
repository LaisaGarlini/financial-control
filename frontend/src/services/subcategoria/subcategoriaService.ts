import { SubcategoriaDTO } from '@/dto/subcategoria.dto'
import { ApiControleFinanceiro } from '@/infra/api'

export const SubcategoriaService = {
    async getSubcategorias(): Promise<SubcategoriaDTO[]> {
        const { data } = await ApiControleFinanceiro.get<SubcategoriaDTO[]>('/subcategoria')
        return data
    },
    async criar(subcategoria: Omit<SubcategoriaDTO, 'id'>): Promise<SubcategoriaDTO> {
        const { data } = await ApiControleFinanceiro.post<SubcategoriaDTO>('/subcategoria', {
            data: subcategoria,
        })
        return data
    },
}
