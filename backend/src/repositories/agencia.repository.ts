import { AgenciaDTO } from '../dto/agencia.dto'
import { Agencia } from '../models/agencia'

export const AgenciaRepository = {
    async GetAgencias(): Promise<AgenciaDTO[]> {
        return await Agencia.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
    },

    async GetAgenciaById(id: number): Promise<AgenciaDTO | null> {
        return await Agencia.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })
    },

    async Create(data: AgenciaDTO): Promise<AgenciaDTO> {
        return await Agencia.create({
            usuario_id: data.usuario_id,
            banco_id: data.banco_id,
            agencia: data.agencia,
            ativo: data.ativo,
        })
    },

    async Update(data: AgenciaDTO): Promise<boolean> {
        const agencia = await Agencia.findByPk(data.id)

        if (agencia) {
            await agencia.update({ data })
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const agencia = await Agencia.findByPk(id)

        if (agencia) {
            await agencia.destroy()
            return true
        }

        return false
    },
}
