'use client'

import { useState, useEffect } from 'react'

import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { AgenciaService } from '@/services/agencia/agenciaService'
import { AgenciaDTO } from '@/dto/agencia.dto'
import { CriaColunasProps } from '@/components/tabela_padrao/criaColunas'
import { TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'

const columns: CriaColunasProps = {
    selectVisible: true,
    colunmAtivo: true,
    colunas: [
        { accessorKey: 'id', label: 'ID' },
        { accessorKey: 'banco.nome', label: 'Nome do Banco' },
        { accessorKey: 'agencia', label: 'Agência' },
    ],
}

const colunasStyle = [
    { id: 'select', style: 'text-center w-[35px]' },
    { id: 'id', style: 'text-right w-[80px]' },
    { id: 'nome_banco', style: 'text-left' },
    { id: 'agencia', style: 'text-left' },
    { id: 'ativo', style: 'text-center w-[80px]' },
]

export default function AgenciaConsulta() {
    const [data, setData] = useState<AgenciaDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AgenciaService.getAgencias()
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
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Agências</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="agencia" />

                <TabelaPadrao data={data} colunas={columns} colunasStyle={colunasStyle} />
            </div>
        </div>
    )
}
