import { portadorDTO } from '../dto/portador.dto'
import { Portador } from '../models/portador'

export const PortadorRepository = {
    async GetPortadores(): Promise<portadorDTO[]> {
        return await Portador.findAll()
    },

    async GetPortadorById(id: number): Promise<portadorDTO | null> {
        return await Portador.findByPk(id)
    },

    async Create(data: Omit<portadorDTO, 'id'>): Promise<portadorDTO> {
        return await Portador.create(data)
    },

    async Update(data: Partial<portadorDTO>): Promise<boolean> {
        const portador = await Portador.findByPk(data.id)

        if (portador) {
            await portador.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const portador = await Portador.findByPk(id)

        if (portador) {
            await portador.destroy()
            return true
        }

        return false
    },
}
