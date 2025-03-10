import { SubcategoriaDTO } from '../dto/subcategoria.dto'
import { SubCategoria } from '../models/subcategoria'
import { Categoria } from '../models/categoria'

export const SubcategoriaRepository = {
    async GetSubcategorias(): Promise<SubcategoriaDTO[]> {
        return await SubCategoria.findAll({
            include: {
                model: Categoria,
                attributes: ['nome'],
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async GetSubcategoriaById(id: number): Promise<SubcategoriaDTO | null> {
        return await SubCategoria.findByPk(id, {
            include: {
                model: Categoria,
                attributes: ['nome'],
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async Create(data: Omit<SubcategoriaDTO, 'id'>): Promise<SubcategoriaDTO> {
        return await SubCategoria.create({
            usuario_id: data.usuario_id,
            nome: data.nome,
            categoria_id: data.categoria_id,
            tipo: data.tipo,
            ativo: data.ativo,
        })
    },

    async Update(data: SubcategoriaDTO): Promise<boolean> {
        const subcategoria = await SubCategoria.findByPk(data.id)

        if (subcategoria) {
            await subcategoria.update(data) // Corrigido: passando `data` diretamente
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const subcategoria = await SubCategoria.findByPk(id)

        if (subcategoria) {
            await subcategoria.destroy()
            return true
        }

        return false
    },
}
