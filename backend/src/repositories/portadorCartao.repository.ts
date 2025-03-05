import { portadorCartaoDTO } from '../dto/portadorCartao.dto'
import { PortadorCartao } from '../models/portador_cartao'

export const PortadorCartaoRepository = {
    async GetPortadoresCartao(): Promise<portadorCartaoDTO[]> {
        return await PortadorCartao.findAll()
    },

    async GetPortadorCartaoById(id: number): Promise<portadorCartaoDTO | null> {
        return await PortadorCartao.findByPk(id)
    },

    async Create(data: Omit<portadorCartaoDTO, 'id'>): Promise<portadorCartaoDTO> {
        return await PortadorCartao.create(data)
    },

    async Update(data: Partial<portadorCartaoDTO>): Promise<boolean> {
        const portador = await PortadorCartao.findByPk(data.id)

        if (portador) {
            await portador.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const portador = await PortadorCartao.findByPk(id)

        if (portador) {
            await portador.destroy()
            return true
        }

        return false
    },
}
