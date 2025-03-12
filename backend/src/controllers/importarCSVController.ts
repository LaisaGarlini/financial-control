import { Request, Response } from 'express'
import csv from 'csv-parser'
import { Readable } from 'stream'
import { Pessoa } from '../models/pessoa'
import { SubCategoria } from '../models/subcategoria'
import { ImportarCSVRepository } from '../repositories/importarCSV.repository'

export const importCSV = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ message: 'Nenhum arquivo enviado.' })
        return
    }

    const results: any[] = []

    try {
        const fileContent = req.file.buffer.toString()

        if (!fileContent.includes('Data,Valor,Identificador,Descrição')) {
            res.status(400).json({ message: 'Formato de arquivo CSV inválido.' })
            return
        }

        const readableStream = Readable.from(fileContent)

        readableStream
            .pipe(csv())
            .on('data', (data) => {
                console.log('Linha processada:', data)
                results.push(data)
            })
            .on('end', async () => {
                console.log('Processamento do CSV concluído. Total de linhas:', results.length)

                for (const row of results) {
                    const { Data, Valor, Identificador, Descrição } = row

                    if (!Descrição || typeof Descrição !== 'string') {
                        console.error('Descrição inválida:', Descrição)
                        continue
                    }

                    const partesDescricao = Descrição.split('-')
                    if (partesDescricao.length < 2) {
                        console.error('Formato de descrição inválido:', Descrição)
                        continue
                    }

                    const nomePessoa = partesDescricao[1].trim()
                    if (!nomePessoa) {
                        console.error('Não foi possível extrair o nome da pessoa da descrição:', Descrição)
                        continue
                    }

                    const natureza = Descrição.includes('•••.543.659-••') ? 'F' : Descrição.includes('47.120.099/0001-29') ? 'J' : 'F'

                    let pessoa = await Pessoa.findOne({ where: { razao_social: nomePessoa } })
                    if (!pessoa) {
                        console.log(`Criando nova pessoa: ${nomePessoa}`)
                        pessoa = await Pessoa.create({ usuario_id: 1, razao_social: nomePessoa, natureza })
                    }

                    const dataVencimento = new Date(Data)
                    if (isNaN(dataVencimento.getTime())) {
                        console.error('Data inválida:', Data)
                        continue
                    }

                    const valorBruto = Math.abs(parseFloat(Valor))
                    if (isNaN(valorBruto)) {
                        console.error('Valor inválido:', Valor)
                        continue
                    }

                    let subcategoria
                    if (Descrição.includes('LAISA GARLINI - •••.543.659-•• - BANCO SICOOB S.A. (0756) Agência: 3034 Conta: 72156-5')) {
                        subcategoria = await SubCategoria.findOne({ where: { nome: 'Salário - Vexta', tipo: 2 } })
                    } else {
                        const tipoSubcategoria = valorBruto >= 0 ? 2 : 1
                        subcategoria = await SubCategoria.findOne({ where: { nome: 'Importados', tipo: tipoSubcategoria } })
                    }

                    if (!subcategoria) {
                        console.error('Subcategoria não encontrada para a descrição:', Descrição)
                        continue
                    }

                    try {
                        await ImportarCSVRepository.Create({
                            usuario_id: 1,
                            descricao: 'Importado via CSV',
                            subcategoria_id: subcategoria.id,
                            pessoa_id: pessoa.id,
                            situacao: 1,
                            valor_bruto: valorBruto,
                            valor_pago: valorBruto,
                            data_vencimento: dataVencimento,
                            data_pagamento: dataVencimento,
                            previsao: false,
                            observacao: Descrição,
                        })
                        console.log(`Movimento financeiro criado para: ${nomePessoa}`)
                    } catch (error) {
                        console.error('Erro ao criar movimento financeiro:', error)
                    }
                }

                res.status(200).json({ message: 'Dados importados com sucesso.' })
            })
            .on('error', (error) => {
                console.error('Erro ao processar CSV:', error)
                res.status(500).json({ message: 'Erro ao processar arquivo CSV.' })
            })
    } catch (error) {
        console.error('Erro geral:', error)
        res.status(500).json({ message: 'Erro ao importar dados.', error })
    }
}
