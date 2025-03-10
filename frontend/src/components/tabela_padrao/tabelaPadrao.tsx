import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useState } from 'react'
import { ColunaStyleDTO } from '@/dto/colunaStyle.dto'
import { criaColunas, CriaColunasProps } from './criaColunas'

interface TabelaPadraoProps<T> {
    data: T[]
    colunas: CriaColunasProps
    colunasStyle?: ColunaStyleDTO[]
}

export function TabelaPadrao<T>(props: TabelaPadraoProps<T>) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])

    const columns: ColumnDef<T>[] = [
        ...criaColunas<T>({
            selectVisible: props.colunas.selectVisible,
            colunmAtivo: props.colunas.colunmAtivo,
            colunas: props.colunas.colunas,
        }),
    ]

    const table = useReactTable({
        data: props.data,
        columns: columns,
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

    function colunmStyle(id: string) {
        if (!props.colunasStyle) {
            return ''
        }

        const coluna = props.colunasStyle.find((coluna) => coluna.id === id)
        return coluna ? coluna.style : ''
    }

    function baget(value: string) {
        return <span className={`px-2 py-1 rounded ${colunmStyle(value)}`}>{value}</span>
    }

    return (
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
                                    console.log(cell.getContext())
                                    const coluna = props.colunas.colunas.find((coluna) => coluna.accessorKey === cell.column.id)
                                    {
                                        return coluna?.colunaWithBadge ? (
                                            <TableCell key={cell.id} className={colunmStyle(cell.column.id)}>
                                                {baget(String(cell.getValue() || ''))}
                                            </TableCell>
                                        ) : (
                                            <TableCell key={cell.id} className={colunmStyle(cell.column.id)}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    }
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
