import { SubcategoriaDTO } from '../dto/subcategoria.dto'
import { SubCategoria } from '../models/subcategoria'
import { Categoria } from '../models/categoria'

const mapearTipo = (tipo: number): string => {
    return tipo === 1 ? 'Despesa' : 'Receita'
}

export const SubcategoriaRepository = {
    async GetSubcategorias(): Promise<SubcategoriaDTO[]> {
        const subcategorias = await SubCategoria.findAll({
            include: {
                model: Categoria,
                as: 'categoria',
                attributes: ['nome'],
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        // Mapeia o tipo para cada subcategoria
        return subcategorias.map((subcategoria) => ({
            ...subcategoria.get({ plain: true }),
            tipo: mapearTipo(subcategoria.tipo), // Mapeia o tipo
        }))
    },

    async GetSubcategoriaById(id: number): Promise<SubcategoriaDTO | null> {
        const subcategoria = await SubCategoria.findByPk(id, {
            include: {
                model: Categoria,
                as: 'categoria',
                attributes: ['nome'],
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        if (subcategoria) {
            return {
                ...subcategoria.get({ plain: true }),
                tipo: mapearTipo(subcategoria.tipo), // Mapeia o tipo
            }
        }

        return null
    },

    async Create(data: Omit<SubcategoriaDTO, 'id'>): Promise<SubcategoriaDTO> {
        const subcategoria = await SubCategoria.create({
            usuario_id: data.usuario_id,
            nome: data.nome,
            categoria_id: data.categoria_id,
            tipo: data.tipo,
            ativo: data.ativo,
        })

        return {
            ...subcategoria.get({ plain: true }),
            tipo: mapearTipo(subcategoria.tipo), // Mapeia o tipo
        }
    },

    async Update(data: SubcategoriaDTO): Promise<boolean> {
        const subcategoria = await SubCategoria.findByPk(data.id)

        if (subcategoria) {
            await subcategoria.update(data)
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
