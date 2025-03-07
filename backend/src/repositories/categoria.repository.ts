import { categoriaDTO } from '../dto/categoria.dto'
import { Categoria } from '../models/categoria'

export const CategoriaRepository = {
    async GetCategorias(): Promise<categoriaDTO[]> {
        return await Categoria.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
    },

    async GetCategoriaById(id: number): Promise<categoriaDTO | null> {
        return await Categoria.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })
    },

    async Create(data: Omit<categoriaDTO, 'id'>): Promise<categoriaDTO> {
        return await Categoria.create(data)
    },

    async Update(data: Partial<categoriaDTO>): Promise<boolean> {
        const categoria = await Categoria.findByPk(data.id)

        if (categoria) {
            await categoria.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const categoria = await Categoria.findByPk(id)

        if (categoria) {
            await categoria.destroy()
            return true
        }

        return false
    },
}
