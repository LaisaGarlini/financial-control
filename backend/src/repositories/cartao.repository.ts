import { cartaoDTO } from '../dto/cartao.dto'
import { Cartao } from '../models/cartao'

export const CartaoRepository = {
    async GetCartoes(): Promise<cartaoDTO[]> {
        return await Cartao.findAll()
    },

    async GetCartaoById(id: number): Promise<cartaoDTO | null> {
        return await Cartao.findByPk(id)
    },

    async Create(data: Omit<cartaoDTO, 'id'>): Promise<cartaoDTO> {
        return await Cartao.create(data)
    },

    async Update(data: cartaoDTO): Promise<boolean> {
        const cartao = await Cartao.findByPk(data.id)

        if (cartao) {
            await cartao.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const cartao = await Cartao.findByPk(id)

        if (cartao) {
            await cartao.destroy()
            return true
        }

        return false
    },
}
