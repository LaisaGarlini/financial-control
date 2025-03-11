'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import VerticalMenu from '../../components/MenuVertical'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { MensagemSucesso } from '@/components/Mensagem'

export default function BancoCadastro() {
    const [arquivo, setArquivo] = useState<File | null>(null)
    const router = useRouter()

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!arquivo) {
            toast.error('Por favor, selecione um arquivo CSV.')
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', arquivo)

            const response = await fetch(`${API_BASE_URL}/importar_csv`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Falha ao importar arquivo CSV')
            }

            MensagemSucesso('Arquivo CSV importado com sucesso!')

            router.push('/lancamento_financeiro')
        } catch (error) {
            toast.error('Erro ao importar arquivo CSV. Por favor, tente novamente.')
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <VerticalMenu />
            <div className="flex-1 px-8 py-4 overflow-hidden m-0">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Importar Extrato por arquivo CSV</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="arquivo">Arquivo</Label>
                                <Input
                                    id="arquivo"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setArquivo(e.target.files[0])
                                        }
                                    }}
                                />
                            </div>
                            <Button type="submit">Importar</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
