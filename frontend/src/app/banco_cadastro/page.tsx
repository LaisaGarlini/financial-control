'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import VerticalMenu from '../../components/MenuVertical';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MensagemSucesso } from '@/components/Mensagem';

export default function BancoCadastro() {
  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/banco`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          usuario_id: 1,
          nome,
          ativo,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Falha ao cadastrar banco");
      }

      MensagemSucesso('Banco cadastrado com sucesso!');
  
      router.push('/banco');
    } catch (error) {
      toast.error('Erro ao cadastrar banco. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <VerticalMenu />
      <div className="flex-1 px-8 py-4 overflow-hidden m-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Cadastro de Banco</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 flex flex-col items-start justify-start">
              <div className="space-y-2 flex flex-row items-center justify-start">
                <Label htmlFor="id" className='mr-2'>Código do Banco</Label>
                <Input
                  id="id"
                  type="number"
                  value={id || ""}
                  onChange={(e) => setId(Number(e.target.value))}
                  required
                  className='w-20 mr-5'
                />
                <Label htmlFor="name" className='mr-2'>Nome</Label>
                <Input
                  id="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className='w-96 mr-5'
                />
                <Checkbox id="active" checked={ativo} onCheckedChange={(checked) => setAtivo(checked as boolean)} className='mr-2' />
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