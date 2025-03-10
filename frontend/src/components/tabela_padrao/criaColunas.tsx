'use client'

import { faArrowDown, faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CellContext, Column, ColumnDef, Table } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'

export interface CriaColunasProps {
    selectVisible?: boolean
    colunmAtivo?: boolean
    colunas: {
        accessorKey: string
        label: string
        colunaWithBadge?: boolean
    }[]
}

export function criaColunas<T>(configs: CriaColunasProps): ColumnDef<T>[] {
    const colunaSelect: ColumnDef<T> = {
        id: 'select',
        header: ({ table }: { table: Table<T> }) => (
            <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
        ),
        cell: ({ row }: CellContext<T, unknown>) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
        ),
    }

    const colunas = configs.colunas.map<ColumnDef<T>>((config) => ({
        accessorKey: config.accessorKey,
        header: ({ column }: { column: Column<T, unknown> }) => (
            <button
                className="flex items-center hover:bg-gray-100 p-2 rounded"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                {config.label}
                {column.getIsSorted() === 'asc' ? (
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
                )}
            </button>
        ),
    }))

    const colunaAtivo: ColumnDef<T> = {
        accessorKey: 'ativo',
        header: ({ column }: { column: Column<T, unknown> }) => (
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
        cell: ({ row }: CellContext<T, unknown>) => (
            <div className="flex justify-center">
                {(row?.original as any)?.ativo ? <FontAwesomeIcon icon={faCheck} className="text-black" /> : null}
            </div>
        ),
    }

    let colunasFinais = [...colunas]

    if (configs.colunmAtivo) {
        colunasFinais.push(colunaAtivo)
    }

    if (configs.selectVisible) {
        colunasFinais = [colunaSelect, ...colunasFinais]
    }

    return colunasFinais
}
