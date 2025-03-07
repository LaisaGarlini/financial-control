import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChartLine, faCog, faMoneyBillTransfer, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const VerticalMenu = () => {
    return (
        <TooltipProvider>
            <div className="flex flex-col w-16 bg-zinc-800 text-white h-screen p-4 rounded-tr-3xl rounded-br-3xl">
                <div className="flex-1 space-y-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/home" className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded">
                                <FontAwesomeIcon icon={faHome} className="text-xl" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Home</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/dashboard" className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded">
                                <FontAwesomeIcon icon={faChartLine} className="text-xl" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Dashboards</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/lancamento_financeiro_cadastro"
                                className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded"
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-xl" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Novo Lançamento Financeiro</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/lancamento_financeiro" className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-xl" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Ver Lançamentos Financeiros</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="mt-auto">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/configuracoes" className="flex items-center justify-center p-2 hover:bg-zinc-700 rounded">
                                <FontAwesomeIcon icon={faCog} className="text-xl" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Configurações</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default VerticalMenu
