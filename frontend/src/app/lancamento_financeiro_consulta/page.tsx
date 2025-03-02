'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Car } from 'lucide-react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import VerticalMenu from '../../components/MenuVertical';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

const data = [
  {
    id: 1,
    descricao: "Abastecer sandro",
    categoria: "Gasolina",
    fornecedor: "Posto Russi Express",
    situacao: "Pago",
    valorBruto: 100.0,
    valorPago: 99.0,
    dataVencimento: "2023-10-15",
    dataPagamento: "2023-10-10",
  },
  {
    id: 2,
    descricao: "Manutenção de equipamentos",
    categoria: "Despesas Operacionais",
    fornecedor: "TecnoManut",
    situacao: "Pendente",
    valorBruto: 3500.0,
    valorPago: 0.0,
    dataVencimento: "2023-11-01",
    dataPagamento: null,
  },
  {
    id: 3,
    descricao: "Pagamento de salários",
    categoria: "Despesas com Pessoal",
    fornecedor: "Folha de Pagamento",
    situacao: "Pago",
    valorBruto: 50000.0,
    valorPago: 50000.0,
    dataVencimento: "2023-10-30",
    dataPagamento: "2023-10-28",
  },
];

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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "descricao",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Descrição
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "categoria",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categoria
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "fornecedor",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome do Fornecedor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "situacao",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Situação
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const situacao = row.original.situacao;
      let bgColor = "";
      let textColor = "";
      
      if (situacao === "Pago") {
        bgColor = "bg-green-500";
        textColor = "text-white";
      } else if (situacao === "Pendente") {
        bgColor = "bg-yellow-300";
        textColor = "text-yellow-800";
      }

      return (
        <span className={`px-2 py-1 rounded ${bgColor} ${textColor}`}>
          {situacao}
        </span>
      );
    },
  },
  {
    accessorKey: "valorBruto",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valor Bruto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => `R$ ${row.original.valorBruto.toFixed(2)}`,
  },
  {
    accessorKey: "valorPago",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valor Pago
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => `R$ ${row.original.valorPago.toFixed(2)}`,
  },
  {
    accessorKey: "dataVencimento",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Vencimento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "dataPagamento",
    header: ({ column }) => (
      <button
        className="flex items-center hover:bg-gray-100 p-2 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Pagamento
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
];

export default function HomePage() {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);

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
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <VerticalMenu />
      <div className="flex-1 px-8 py-4 overflow-hidden m-0">
        <div className='flex flex-col md:flex-row justify-between items-center pb-3 m-0'>
          <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-0'>Lançamento Financeiros</h1>
          <h1 className='text-base'>Laisa Garlini</h1>
        </div>
        <div className='mb-3'>
          <Card className='flex row items-center content-start p-2'>
            <Label className='pr-5' htmlFor="buscar">Buscar</Label>
            <Input className='w-96 h-7' id="buscar" type="text" />
            <Button className='w-20 mx-3 h-7'>Pesquisar</Button>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}