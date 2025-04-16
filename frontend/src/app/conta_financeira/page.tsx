'use client'

import { useState, useEffect } from 'react'
import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { TabelaPadrao, ColunaTabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'

const colunas: ColunaTabelaPadrao[] = [
    { nome: 'agencium.banco.id', style: 'text-left', label: 'ID do Banco' },
    { nome: 'agencium.banco.nome', style: 'text-left', label: 'Nome do Banco' },
    { nome: 'agencium.agencia', style: 'text-left', label: 'Agência' },
    { nome: 'nome', style: 'text-left', label: 'Nome' },
    { nome: 'numero', style: 'text-left', label: 'Número' },
    { nome: 'tipo', style: 'text-left', label: 'Tipo' },
    { nome: 'ativo', style: 'text-center', label: 'Ativo', isBoolean: true },
]

export default function ContaFinanceiraConsulta() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/conta_financeira')
                const result = await response.json()
                setData(result)
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
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Contas Financeiras</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="conta_financeira" />

                <TabelaPadrao data={data} colunas={colunas} />
            </div>
        </div>
    )
}
