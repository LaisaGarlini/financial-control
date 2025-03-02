// HomePage.js
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import VerticalMenu from '../../components/MenuVertical';

const cardData = {
  totalReceita: 15000,
  totalDespesa: 10000,
  saldo: 5000,
};

const data = [
  { month: 'Jan', receita: 5000, despesa: 3000, saldo: 2000 },
  { month: 'Fev', receita: 5500, despesa: 3200, saldo: 2300 },
  { month: 'Mar', receita: 6000, despesa: 3500, saldo: 2500 },
  { month: 'Abr', receita: 5800, despesa: 3300, saldo: 2500 },
  { month: 'Mai', receita: 6200, despesa: 4000, saldo: 2200 },
  { month: 'Jun', receita: 6400, despesa: 4200, saldo: 2200 },
  { month: 'Jul', receita: 7000, despesa: 4800, saldo: 2200 },
  { month: 'Ago', receita: 6800, despesa: 4600, saldo: 2200 },
  { month: 'Set', receita: 7200, despesa: 5000, saldo: 2200 },
  { month: 'Out', receita: 7500, despesa: 5200, saldo: 2300 },
  { month: 'Nov', receita: 7800, despesa: 5500, saldo: 2300 },
  { month: 'Dez', receita: 8000, despesa: 5800, saldo: 2200 },
];

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <VerticalMenu />
      <div className="flex-1 px-8 py-6 overflow-hidden m-0">
        {/* Cabeçalho */}
        <div className='flex flex-col md:flex-row justify-between items-center pb-3 m-0'>
          <h1 className='text-2xl md:text-3xl font-medium mb-4 md:mb-0'>Controle Financeiro</h1>
          <h1 className='text-base'>Laisa Garlini</h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-0">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">Total Receita</h3>
              <p className="text-2xl font-bold text-green-500">R$ {cardData.totalReceita.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">Total Despesa</h3>
              <p className="text-2xl font-bold text-red-500">R$ {cardData.totalDespesa.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">Saldo do Mês</h3>
              <p className="text-2xl font-bold text-blue-500">R$ {cardData.saldo.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico */}
        <Card className="overflow-hidden m-0 p-0">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4 text-zinc-800">Resumo Financeiro Anual</h2>
            <div className="w-full h-[400px]"> {/* Altura fixa para o gráfico */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="receita" fill="#22c55e" name="Receita" />
                  <Bar dataKey="despesa" fill="#F44336" name="Despesa" />
                  <Bar dataKey="saldo" fill="#3b82f6" name="Saldo" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}