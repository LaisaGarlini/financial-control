'use client'

import { useState, useEffect } from 'react'

import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { AgenciaService } from '@/services/agencia/agenciaService'
import { AgenciaDTO } from '@/dto/agencia.dto'
import { ColunaTabelaPadrao, TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'

const columns: ColunaTabelaPadrao[] = [
    { nome: 'id', style: 'text-left', label: 'ID' },
    { nome: 'banco.nome', style: 'text-left', label: 'Banco' },
    { nome: 'agencia', style: 'text-left', label: 'Agência' },
    { nome: 'ativo', style: 'text-center', label: 'Ativo', isBoolean: true },
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

                <TabelaPadrao data={data} colunas={columns} />
            </div>
        </div>
    )
}
