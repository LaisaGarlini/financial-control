import { contaFinanceiraDTO } from '../dto/contaFinanceira.dto'
import { ContaFinanceira } from '../models/conta_financeira'

export const ContaFinanceiraRepository = {
    async GetContasFinanceira(): Promise<contaFinanceiraDTO[]> {
        return await ContaFinanceira.findAll()
    },

    async GetContaFinanceiraById(id: number): Promise<contaFinanceiraDTO | null> {
        return await ContaFinanceira.findByPk(id)
    },

    async Create(data: Omit<contaFinanceiraDTO, 'id'>): Promise<contaFinanceiraDTO> {
        return await ContaFinanceira.create(data)
    },

    async Update(data: Partial<contaFinanceiraDTO>): Promise<boolean> {
        const conta = await ContaFinanceira.findByPk(data.id)

        if (conta) {
            await conta.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const conta = await ContaFinanceira.findByPk(id)

        if (conta) {
            await conta.destroy()
            return true
        }

        return false
    },
}
