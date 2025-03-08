'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    SortingState,
    ColumnDef,
} from '@tanstack/react-table'
import VerticalMenu from '../../components/MenuVertical'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { AgenciaService } from '@/services/agencia/agenciaService'
import { AgenciaDTO } from '@/dto/agencia.dto'

const columns: ColumnDef<AgenciaDTO>[] = [
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
                {column.getIsSorted() === 'asc' ? (
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
                )}
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
                {column.getIsSorted() === 'asc' ? (
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
                )}
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
                {column.getIsSorted() === 'asc' ? (
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
                )}
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
                {column.getIsSorted() === 'asc' ? (
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
                )}
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
    const [sorting, setSorting] = useState<SortingState>([])
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

    function colunmStyle(columnName: string) {
        let className = 'px-4 py-2'

        if (columnName === 'select') {
            className += ' text-center w-[35px]'
        } else if (columnName === 'id') {
            className += ' text-right w-[80px]'
        } else if (columnName === 'nome_banco') {
            className += ' text-left'
        } else if (columnName === 'agencia') {
            className += ' text-left'
        } else if (columnName === 'ativo') {
            className += ' text-center w-[80px]'
        }

        return className
    }

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
                                            return (
                                                <TableHead key={header.id} className={colunmStyle(header.column.id)}>
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
                                            return (
                                                <TableCell key={cell.id} className={colunmStyle(cell.column.id)}>
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
