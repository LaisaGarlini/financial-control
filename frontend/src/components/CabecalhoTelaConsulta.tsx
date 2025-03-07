'use client'

import { Label } from '@/components/ui/label'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface CabecalhoTelaConsultaProps {
    buscar?: boolean
    cadastro?: boolean
    editar?: boolean
    excluir?: boolean
    href?: string
}

export function CabecalhoTelaConsulta({
    buscar = true,
    cadastro = true,
    editar = true,
    excluir = true,
    href = '',
}: CabecalhoTelaConsultaProps) {
    return (
        <div className="mb-3">
            <Card className="flex flex-col md:flex-row items-center justify-between p-2">
                {buscar && (
                    <div className="flex items-center">
                        <Label className="pr-5" htmlFor="buscar">
                            Buscar
                        </Label>
                        <Input className="w-96 h-7" id="buscar" type="text" />
                        <Button className="w-28 mx-3 h-7">
                            <FontAwesomeIcon icon={faSearch} /> Pesquisar
                        </Button>
                    </div>
                )}
                <div className="flex gap-3 ml-auto">
                    {cadastro && (
                        <Link href={`${href}_cadastro`}>
                            <Button className="w-24 h-7">
                                <FontAwesomeIcon icon={faPlus} /> Cadastrar
                            </Button>
                        </Link>
                    )}
                    {editar && (
                        <Link href={`${href}_editar`}>
                            <Button className="w-24 h-7">
                                <FontAwesomeIcon icon={faEdit} /> Editar
                            </Button>
                        </Link>
                    )}
                    {excluir && (
                        <Link href={`${href}_excluir`}>
                            <Button className="w-24 h-7">
                                <FontAwesomeIcon icon={faTrash} /> Excluir
                            </Button>
                        </Link>
                    )}
                </div>
            </Card>
        </div>
    )
}
