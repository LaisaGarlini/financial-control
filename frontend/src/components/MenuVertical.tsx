'use client'

import React from 'react'
import {
    faHome,
    faCog,
    faMoneyBillTransfer,
    faPlus,
    faFileCsv,
    faBank,
    faCommentDollar,
    faMoneyBill1,
    faPerson,
    faDove,
    faPiggyBank,
    faBoxesPacking,
    faTractor,
} from '@fortawesome/free-solid-svg-icons'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MenuVerticalItem } from '@/components/MenuVerticalItem'
import { ROTAS } from '@/enums/rotas'

const VerticalMenu = () => {
    return (
        <TooltipProvider>
            <div className="flex flex-col w-16 bg-zinc-800 text-white h-screen p-4 rounded-tr-3xl rounded-br-3xl">
                <div className="flex-1 space-y-4">
                    <MenuVerticalItem href={ROTAS.HOME} icon={faHome} title="Home" />
                    <MenuVerticalItem href={ROTAS.AGENCIA} icon={faCommentDollar} title="Agencia" />
                    <MenuVerticalItem href={ROTAS.BANCO} icon={faBank} title="Banco" />
                    <MenuVerticalItem href={ROTAS.CONTA_FINANCEIRA} icon={faMoneyBill1} title="Conta Financeira" />
                    <MenuVerticalItem href={ROTAS.CONTA_FINANCEIRA_CADASTRO} icon={faPlus} title="Nova Conta" />
                    <MenuVerticalItem href={ROTAS.PESSOA} icon={faPerson} title="Pessoa" />
                    <MenuVerticalItem href={ROTAS.CATEGORIA} icon={faDove} title="Categoria" />
                    <MenuVerticalItem href={ROTAS.LANCAMENTO_FINANCEIRO} icon={faPiggyBank} title="Lançamento Financeiro" />
                    <MenuVerticalItem href={ROTAS.LANCAMENTO_FINANCEIRO_CADASTRO} icon={faTractor} title="Lançamento Financeiro Cadastro" />
                    <MenuVerticalItem href={ROTAS.BANCO_CADASTRO} icon={faBoxesPacking} title="Novo Banco" />
                    <MenuVerticalItem href={ROTAS.IMPORTAR_CSV} icon={faFileCsv} title="Importar Extrato CSV" />
                    <MenuVerticalItem href={ROTAS.SUBCATEGORIA} icon={faMoneyBillTransfer} title="Subcategoria" />
                </div>

                <div className="mt-auto">
                    <MenuVerticalItem href="/configuracoes" icon={faCog} title="Configurações" />
                </div>
            </div>
        </TooltipProvider>
    )
}

export default VerticalMenu
