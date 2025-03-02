"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Banco {
  id: number;
  usuario_id: number;
  nome: string;
  ativo: boolean;
}

export default function BancosPage() {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchBancos() {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/banco");
      if (!response.ok) {
        throw new Error("Erro ao buscar bancos");
      }
      const data = await response.json();
      setBancos(data);
    } catch (error) {
      console.error("Erro ao buscar bancos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBancos();
  }, []);

  const filteredBancos = bancos.filter((banco) =>
    banco.nome.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { 
      key: "ativo", 
      label: "Ativo", 
      render: (row: Banco) => (
        row.ativo ? <FontAwesomeIcon icon={faCheck} /> : "Não"
      )
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Consulta de Bancos</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Pesquisar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setSearch("")}>Limpar</Button>
        <Button onClick={fetchBancos} disabled={isLoading}>Atualizar</Button>
      </div>
      <DataTable columns={columns} data={filteredBancos} isLoading={isLoading} />
    </div>
  );
}