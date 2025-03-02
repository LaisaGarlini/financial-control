import { bancoDTO } from '../dto/banco.dto'
import { Banco } from '../models/banco'

export const BancoRepository = {
    async GetBancos(): Promise<bancoDTO[]> {
        return await Banco.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
    },

    async GetBancoById(id: number): Promise<bancoDTO | null> {
        return await Banco.findByPk(id, { attributes: { exclude: ['created_at', 'updated_at'] } })
    },

    async Create(data: Omit<bancoDTO, 'id'>): Promise<bancoDTO> {
        return await Banco.create(data)
    },

    async Update(data: bancoDTO): Promise<boolean> {
        const banco = await Banco.findByPk(data.id)

        if (banco) {
            await banco.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const banco = await Banco.findByPk(id)

        if (banco) {
            await banco.destroy()
            return true
        }

        return false
    },
}
