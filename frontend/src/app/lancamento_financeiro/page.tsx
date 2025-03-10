'use client'

import VerticalMenu from '../../components/MenuVertical'
import { CabecalhoTelaConsulta } from '@/components/CabecalhoTelaConsulta'
import { CriaColunasProps } from '@/components/tabela_padrao/criaColunas'
import { TabelaPadrao } from '@/components/tabela_padrao/tabelaPadrao'
import { ColunaStyleDTO } from '@/dto/colunaStyle.dto'

const data = [
    {
        id: 1,
        descricao: 'Abastecer sandro',
        categoria: 'Gasolina',
        fornecedor: 'Posto Russi Express',
        situacao: 'Pago',
        valorBruto: 100.0,
        valorPago: 99.0,
        dataVencimento: '2023-10-15',
        dataPagamento: '2023-10-10',
    },
    {
        id: 2,
        descricao: 'Manutenção de equipamentos',
        categoria: 'Despesas Operacionais',
        fornecedor: 'TecnoManut',
        situacao: 'Pendente',
        valorBruto: 3500.0,
        valorPago: 0.0,
        dataVencimento: '2023-11-01',
        dataPagamento: null,
    },
    {
        id: 3,
        descricao: 'Pagamento de salários',
        categoria: 'Despesas com Pessoal',
        fornecedor: 'Folha de Pagamento',
        situacao: 'Pago',
        valorBruto: 50000.0,
        valorPago: 50000.0,
        dataVencimento: '2023-10-30',
        dataPagamento: '2023-10-28',
    },
]

const colunasTabela: CriaColunasProps = {
    selectVisible: true,
    colunmAtivo: false,
    colunas: [
        { accessorKey: 'descricao', label: 'Descrição' },
        { accessorKey: 'categoria', label: 'Categoria' },
        { accessorKey: 'fornecedor', label: 'Nome do Fornecedor' },
        { accessorKey: 'situacao', label: 'Situação', colunaWithBadge: true },
        { accessorKey: 'valorBruto', label: 'Valor Bruto' },
        { accessorKey: 'valorPago', label: 'Valor Pago' },
        { accessorKey: 'dataVencimento', label: 'Data de Vencimento' },
        { accessorKey: 'dataPagamento', label: 'Data de Pagamento' },
    ],
}

const colunasStyle: ColunaStyleDTO[] = [
    { id: 'Pago', style: 'bg-green-500 text-white' },
    { id: 'Pendente', style: 'bg-yellow-300 text-yellow-800' },
]

export default function HomePage() {
    return (
        <div className="flex h-screen overflow-hidden">
            <VerticalMenu />
            <div className="flex-1 px-8 py-4 overflow-hidden m-0">
                <div className="flex flex-col md:flex-row justify-between items-center pb-3 m-0">
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Lançamento Financeiros</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>
                <CabecalhoTelaConsulta href="lancamento_financeiro" />

                <TabelaPadrao data={data} colunas={colunasTabela} colunasStyle={colunasStyle} />
            </div>
        </div>
    )
}
