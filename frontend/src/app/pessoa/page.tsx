'use client'

import { useState, useEffect } from 'react'
import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { PessoaService } from '@/services/pessoa/pessoaService'
import { PessoaDTO } from '@/dto/pessoa.dto'
import { CriaColunasProps } from '@/components/tabela_padrao/criaColunas'
import { TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'
import { ColunaStyleDTO } from '@/dto/colunaStyle.dto'

const columns: CriaColunasProps = {
    selectVisible: true,
    colunmAtivo: true,
    colunas: [
        { accessorKey: 'razao_social', label: 'Razão Social' },
        { accessorKey: 'natureza', label: 'Natureza' },
        { accessorKey: 'cpf_cnpj', label: 'CPF/CNPJ' },
    ],
}

const colunasStyle: ColunaStyleDTO[] = [
    { id: 'razao_social', style: 'text-left' },
    { id: 'natureza', style: 'text-center' },
    { id: 'cpf_cnpj', style: 'text-left w-[150px]' },
    { id: 'ativo', style: 'text-center w-[80px]' },
]

export default function SubcategoriaConsulta() {
    const [data, setData] = useState<PessoaDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PessoaService.getPessoas()
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
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Pessoas</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="pessoa" />

                <TabelaPadrao data={data} colunas={columns} colunasStyle={colunasStyle} />
            </div>
        </div>
    )
}
