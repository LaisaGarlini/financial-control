'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import VerticalMenu from '../../components/MenuVertical'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'

const columns = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
        ),
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <button
                className="flex items-center hover:bg-gray-100 p-2 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
        ),
    },
    {
        accessorKey: 'banco.nome',
        header: ({ column }) => (
            <button
                className="flex items-center hover:bg-gray-100 p-2 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Nome do Banco
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
        ),
    },
    {
        accessorKey: 'agencia',
        header: ({ column }) => (
            <button
                className="flex items-center hover:bg-gray-100 p-2 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Agência
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
        ),
    },
    {
        accessorKey: 'ativo',
        header: ({ column }) => (
            <button
                className="flex items-center hover:bg-gray-100 p-2 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Ativo
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                {row.original.ativo ? <FontAwesomeIcon icon={faCheck} className="text-black" /> : null}
            </div>
        ),
    },
]

export default function AgenciaConsulta() {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/agencia')
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error)
            }
        }

        fetchData()
    }, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            sorting,
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex h-screen overflow-hidden">
            <VerticalMenu />
            <div className="flex-1 px-8 py-4 overflow-hidden m-0">
                <div className="flex flex-col md:flex-row justify-between items-center pb-3 m-0">
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Agências</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="agencia" />

                <Card>
                    <CardContent className="p-4">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            let className = 'px-4 py-2'
                                            const style = {}

                                            if (header.id === 'select') {
                                                className += ' text-center'
                                                style.width = '35px'
                                            } else if (header.id === 'id') {
                                                className += ' text-right'
                                                style.width = '80px'
                                            } else if (header.id === 'nome_banco') {
                                                className += ' text-left'
                                            } else if (header.id === 'agencia') {
                                                className += ' text-left'
                                            } else if (header.id === 'ativo') {
                                                className += ' text-center'
                                                style.width = '80px'
                                            }

                                            return (
                                                <TableHead key={header.id} className={className} style={style}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            let className = 'px-4 py-2'
                                            const style = {}

                                            if (cell.column.id === 'select') {
                                                className += ' text-center'
                                                style.width = '35px'
                                            } else if (cell.column.id === 'id') {
                                                className += ' text-right'
                                                style.width = '80px'
                                            } else if (cell.column.id === 'nome_banco') {
                                                className += ' text-left'
                                            } else if (cell.column.id === 'agencia') {
                                                className += ' text-left'
                                            } else if (cell.column.id === 'ativo') {
                                                className += ' text-center'
                                                style.width = '80px'
                                            }

                                            return (
                                                <TableCell key={cell.id} className={className} style={style}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
