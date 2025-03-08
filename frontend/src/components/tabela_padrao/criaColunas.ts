'use client'
import type { ColumnDef } from '@tanstack/react-table'

interface CriaColunasProps {
    accessorKey: string
    label: string
}

export function criaColunas(configs: CriaColunasProps[]) {
    const teste = configs.map((config) => ({
        header: () => <button>{config.label}</button>,
    }))

    return teste
}
