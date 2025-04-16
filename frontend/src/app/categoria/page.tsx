'use client'

import { useState, useEffect } from 'react'
import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { CategoriaService } from '@/services/categoria/categoriaService'
import { CategoriaDTO } from '@/dto/categoria.dto'
import { ColunaTabelaPadrao, TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'

const colunas: ColunaTabelaPadrao[] = [
    { nome: 'id', style: 'text-left', label: 'ID' },
    { nome: 'nome', style: 'text-left', label: 'Nome' },
    { nome: 'ativo', style: 'text-center w-[80px]', label: 'Ativo', isBoolean: true },
]

export default function CategoriaConsulta() {
    const [data, setData] = useState<CategoriaDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CategoriaService.getCategorias()
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
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Categorias</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="categoria" />

                <TabelaPadrao data={data} colunas={colunas} />
            </div>
        </div>
    )
}
