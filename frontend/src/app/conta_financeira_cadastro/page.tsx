"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table"
import VerticalMenu from "../../components/MenuVertical"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { CabecalhoTelaConsulta } from "@/components/CabecalhoTelaConsulta"

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
    ),
  },
  {
    accessorKey: "agencium.banco.id",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID do Banco
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "agencium.banco.nome",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome do Banco
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "agencium.agencia",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Agência
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "numero",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Número
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const tipoMap = {
        1: "Corrente",
        2: "Poupança",
        3: "Conta Salário",
        4: "Investimentos",
      }
      return tipoMap[row.original.tipo] || "Desconhecido"
    },
  },
  {
    accessorKey: "ativo",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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

export default function ContaFinanceiraConsulta() {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/conta_financeira")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error)
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
          <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Cadsatro de Conta Financeira</h1>
          <h1 className="text-base">Laisa Garlini</h1>
        </div>
        <CabecalhoTelaConsulta />

        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="px-4 py-2">
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
                        <TableCell key={cell.id} className="px-4 py-2">
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