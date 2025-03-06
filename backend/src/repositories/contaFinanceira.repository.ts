import { contaFinanceiraDTO } from '../dto/contaFinanceira.dto'
import { ContaFinanceira } from '../models/conta_financeira'
import { Agencia } from '../models/agencia'
import { Banco } from '../models/banco'

export const ContaFinanceiraRepository = {
    async GetContasFinanceira(): Promise<contaFinanceiraDTO[]> {
        return await ContaFinanceira.findAll({
            include: [
                {
                    model: Agencia,
                    attributes: ['agencia'],
                    include: [
                        {
                            model: Banco,
                            attributes: ['id', 'nome'],
                        },
                    ],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },

    async GetContaFinanceiraById(id: number): Promise<contaFinanceiraDTO | null> {
        return await ContaFinanceira.findByPk(id, {
            include: [
                {
                    model: Agencia,
                    attributes: ['agencia'],
                    include: [
                        {
                            model: Banco,
                            attributes: ['id', 'nome'],
                        },
                    ],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
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
