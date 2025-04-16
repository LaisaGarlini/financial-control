import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useState } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export interface ColunaTabelaPadrao {
    nome: string
    style: string
    label: string
    isBoolean?: boolean
}

interface TabelaPadraoProps<T> {
    data: T[]
    colunas: ColunaTabelaPadrao[]
    itensSelecionados?: (selectedIds: (string | number)[]) => void
}

export function TabelaPadrao<T extends { id: string | number }>(props: TabelaPadraoProps<T>) {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])

    // Função que alterna a seleção de um item específico na tabela
    function alternarSelecaoItem(id: string | number) {
        setSelectedIds((prevSelected) => {
            const isSelected = prevSelected.includes(id)
            const updatedSelection = isSelected ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]

            if (props.itensSelecionados) {
                props.itensSelecionados(updatedSelection)
            }

            return updatedSelection
        })
    }

    // Função que alterna a seleção de todos os itens na tabela
    function alternarSelecaoTodos() {
        if (selectedIds.length === props.data.length) {
            setSelectedIds([])
            if (props.itensSelecionados) {
                props.itensSelecionados([])
            }
        } else {
            const allIds = props.data.map((row) => row.id)
            setSelectedIds(allIds)
            if (props.itensSelecionados) {
                props.itensSelecionados(allIds)
            }
        }
    }

    // Função que obtém o valor de uma propriedade aninhada em um objeto com base em um caminho de string
    function obterValorAninhado(obj: any, caminho: string): any {
        return caminho.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
    }

    return (
        <Card>
            <CardContent className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox checked={selectedIds.length === props.data.length} onCheckedChange={alternarSelecaoTodos} />
                            </TableHead>
                            {props.colunas.map((coluna) => (
                                <TableHead key={coluna.nome} className={coluna.style}>
                                    {coluna.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="w-[50px]">
                                    <Checkbox checked={selectedIds.includes(row.id)} onCheckedChange={() => alternarSelecaoItem(row.id)} />
                                </TableCell>
                                {props.colunas.map((coluna) => {
                                    const value = obterValorAninhado(row, coluna.nome)
                                    return (
                                        <TableCell key={coluna.nome} className={coluna.style}>
                                            {coluna.isBoolean ? (
                                                value ? (
                                                    <FontAwesomeIcon icon={faCheck} className="text-black" />
                                                ) : (
                                                    ''
                                                )
                                            ) : (
                                                value
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
