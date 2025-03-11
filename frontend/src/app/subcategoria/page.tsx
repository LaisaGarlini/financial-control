'use client'

import { useState, useEffect } from 'react'
import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { SubcategoriaService } from '@/services/subcategoria/subcategoriaService'
import { SubcategoriaDTO } from '@/dto/subcategoria.dto'
import { CriaColunasProps } from '@/components/tabela_padrao/criaColunas'
import { TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'
import { ColunaStyleDTO } from '@/dto/colunaStyle.dto'

const columns: CriaColunasProps = {
    selectVisible: true,
    colunmAtivo: true,
    colunas: [
        { accessorKey: 'categoria.nome', label: 'Categoria' },
        { accessorKey: 'nome', label: 'Nome' },
        { accessorKey: 'tipo', label: 'Tipo', colunaWithBadge: true },
    ],
}

const colunasStyle: ColunaStyleDTO[] = [
    { id: 'Receita', style: 'bg-green-300 text-green-700 w-[150px]' },
    { id: 'Despesa', style: 'bg-red-300 text-red-700 w-[150px]' },
    { id: 'categoria.nome', style: 'text-left' },
    { id: 'nome', style: 'text-left' },
    { id: 'ativo', style: 'text-center w-[80px]' },
]

export default function SubcategoriaConsulta() {
    const [data, setData] = useState<SubcategoriaDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubcategoriaService.getSubcategorias()
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
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Subategorias</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="subcategoria" />

                <TabelaPadrao data={data} colunas={columns} colunasStyle={colunasStyle} />
            </div>
        </div>
    )
}
