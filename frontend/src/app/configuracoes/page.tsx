'use client'

import { ConfigBotao } from '@/components/ConfigBotao'
import VerticalMenu from '../../components/MenuVertical'
import { faBank, faBuilding, faWallet, faIdCard, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ROTAS } from '@/enums/rotas'

export default function Configuracoes() {
    return (
        <div className="flex h-screen overflow-hidden">
            <VerticalMenu />
            <div className="flex-1 px-8 py-6 overflow-hidden m-0">
                <div className="flex flex-col md:flex-row justify-between items-center pb-3 m-0">
                    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Configurações</h1>
                    <h1 className="text-base">Laisa Garlini</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-0">
                    <ConfigBotao href={ROTAS.BANCO} icon={faBank} title="Banco" className="w-52 sm:w-auto" iconColor="green" />

                    <ConfigBotao href={ROTAS.AGENCIA} icon={faBuilding} title="Agência" iconColor="blue" />

                    <ConfigBotao href={ROTAS.CONTA_FINANCEIRA} icon={faWallet} title="Conta Financeira" iconColor="red" />

                    {/* <ConfigBotao href={ROTAS.}"/portador" icon={faUser} title="Portador" iconColor="green" /> */}

                    {/* <ConfigBotao href={ROTAS.}"/cartao" icon={faCreditCard} title="Cartão" iconColor="blue" /> */}

                    {/* <ConfigBotao href={ROTAS.}"/portador_cartao" icon={faIdCard} title="Portador e Cartão" iconColor="red" /> */}

                    <ConfigBotao href={ROTAS.CATEGORIA} icon={faIdCard} title="Categoria" iconColor="green" />

                    <ConfigBotao href={ROTAS.SUBCATEGORIA} icon={faIdCard} title="Subcategoria" iconColor="blue" />

                    <ConfigBotao href={ROTAS.PESSOA} icon={faUsers} title="Pessoas" iconColor="red" />
                </div>
            </div>
        </div>
    )
}
