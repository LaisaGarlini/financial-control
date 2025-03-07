"use client"

import { ConfigBotao } from "@/components/ConfigBotao"
import VerticalMenu from "../../components/MenuVertical"
import { faBank, faBuilding, faWallet, faUser, faCreditCard, faIdCard } from "@fortawesome/free-solid-svg-icons"

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <VerticalMenu />
      <div className="flex-1 px-8 py-6 overflow-hidden m-0">
        <div className="flex flex-col md:flex-row justify-between items-center pb-3 m-0">
          <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0">Configurações</h1>
          <h1 className="text-base">Laisa Garlini</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-0">
          <ConfigBotao href="/banco" icon={faBank} title="Banco" className="w-52 sm:w-auto" iconColor="green" />

          <ConfigBotao href="/agencia" icon={faBuilding} title="Agência" iconColor="blue" />

          <ConfigBotao href="/conta_financeira" icon={faWallet} title="Conta Financeira" iconColor="red" />

          <ConfigBotao href="/portador" icon={faUser} title="Portador" iconColor="green" />

          <ConfigBotao href="/cartao" icon={faCreditCard} title="Cartão" iconColor="blue" />

          <ConfigBotao href="/portador_cartao" icon={faIdCard} title="Portador e Cartão" iconColor="red" />

          <ConfigBotao href="/categoria" icon={faIdCard} title="Categoria" iconColor="red" />

          <ConfigBotao href="/subcategoria" icon={faIdCard} title="Subcategoria" iconColor="red" />
        </div>
      </div>
    </div>
  )
}