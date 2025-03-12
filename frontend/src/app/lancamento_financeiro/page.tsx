'use client'

import { useState, useEffect } from 'react'
import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { MovimentoFinanceiroService } from '@/services/movimento_financeiro/movimentoFinanceiroService'
import { MovimentoFinanceiroDTO } from '@/dto/movimentoFinanceiro.dto'
import { CriaColunasProps } from '@/components/tabela_padrao/criaColunas'
import { TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'
import { ColunaStyleDTO } from '@/dto/colunaStyle.dto'

const columns: CriaColunasProps = {
    selectVisible: true,
    colunmAtivo: false,
    colunas: [
        { accessorKey: 'descricao', label: 'Descrição' },
        { accessorKey: 'subcategorium.nome', label: 'Subcategoria' },
        { accessorKey: 'pessoa.razao_social', label: 'Fornecedor' },
        { accessorKey: 'situacao', label: 'Situação', colunaWithBadge: true },
        { accessorKey: 'valor_bruto', label: 'Valor Bruto' },
        { accessorKey: 'valor_pago', label: 'Valor Pago' },
        { accessorKey: 'data_vencimento', label: 'Vencimento' },
        { accessorKey: 'data_pagamento', label: 'Pagamento' },
    ],
}

const colunasStyle: ColunaStyleDTO[] = [
    { id: 'Pago', style: 'bg-green-500 text-white w-[70px]' },
    { id: 'Pendente', style: 'bg-yellow-300 text-yellow-800 w-[70px]' },

    { id: 'descricao', style: 'text-left' },
    { id: 'subcategorium.nome', style: 'text-left w-[130px]' },
    { id: 'pessoa.razao_social', style: 'text-left' },

    { id: 'valor_bruto', style: 'text-right w-[130px]' },
    { id: 'valor_pago', style: 'text-right w-[130px]' },

    { id: 'data_vencimento', style: 'text-center w-[130px]' },
    { id: 'data_pagamento', style: 'text-center w-[130px]' },
]

export default function MovimentoFinanceiroConsulta() {
    const [data, setData] = useState<MovimentoFinanceiroDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MovimentoFinanceiroService.getMovimentosFinanceiro()
                setData(response)
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <VerticalMenu />
            <div className="flex-1 px-8 py-4 overflow-hidden m-0">
                <div className="flex flex-col md:flex-row justify-between items-center pb-3 m-0">
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Movimentos Financeiros</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="movimento_financeiro" />

                <TabelaPadrao data={data} colunas={columns} colunasStyle={colunasStyle} />
            </div>
        </div>
    )
}
