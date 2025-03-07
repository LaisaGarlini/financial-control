'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import VerticalMenu from '../../components/MenuVertical';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

export default function BancoCadastro() {
  const [nome, setNome] = useState("")
  const [ativo, setAtivo] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/banco`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: 1,
          nome,
          ativo,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao cadastrar banco")
      }

      const novoBanco = await response.json()
      alert(`Banco "${novoBanco.nome}" cadastrado com sucesso!`)
      setNome("")
      setAtivo(true)
    } catch (error) {
      console.error("Erro ao cadastrar banco:", error)
      alert("Erro ao cadastrar banco. Por favor, tente novamente.")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <VerticalMenu />
      <div className="flex-1 px-8 py-4 overflow-hidden m-0">

        <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro de Banco</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 flex flex-row items-center justify-start">
            <div className="space-y-2 flex flex-row items-center justify-start">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className='w-96'
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="active" checked={ativo} onCheckedChange={(checked) => setAtivo(checked as boolean)} />
              <Label htmlFor="active" className="cursor-pointer">
                Ativo
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </CardFooter>
        </form> 
        </Card>
      </div>
    </div>
  );
}