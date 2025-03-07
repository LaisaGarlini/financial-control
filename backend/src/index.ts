import express from 'express'
import cors from 'cors'
import sequelize from './config/database'
import bancoRoutes from './routes/bancoRoutes'
import usuarioRoutes from './routes/usuarioRoutes'
import agenciaRoutes from './routes/agenciaRoutes'
import contaFinanceiraRoutes from './routes/contaFinanceiraRoutes'
import portadorRoutes from './routes/portadorRoutes'
import cartaoRoutes from './routes/cartaoRoutes'
import portadorCartaoRoutes from './routes/portadorCartaoRoutes'
import categoriaRoutes from './routes/categoriaRoutes'
import subcategoriaRoutes from './routes/subcategoriaRoutes'
import { AgenciaRepository } from './repositories/agencia.repository'
import { BancoRepository } from './repositories/banco.repository'
import { ContaFinanceiraRepository } from './repositories/contaFinanceira.repository'
import { CartaoRepository } from './repositories/cartao.repository'
import { PortadorCartaoRepository } from './repositories/portadorCartao.repository'
import { PortadorRepository } from './repositories/portador.repository'
import { UsuarioRepository } from './repositories/usuario.repository'
import { CategoriaRepository } from './repositories/categoria.repository'
import { SubcategoriaRepository } from './repositories/subcategoria.repository'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/api', [
    bancoRoutes,
    usuarioRoutes,
    agenciaRoutes,
    contaFinanceiraRoutes,
    portadorRoutes,
    cartaoRoutes,
    portadorCartaoRoutes,
    categoriaRoutes,
    subcategoriaRoutes,
])

app.get('/', (req, res) => {
    res.send('Backend do controle financeiro está rodando!')
})

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso.')

        // quando craiar a primeira vez dropTables = true para inserir os dados
        const dropTables = true
        await sequelize.sync({ force: dropTables })
        console.log('Banco de dados sincronizado.')

        if (dropTables) {
            console.log('Recriando dados de teste...')

            const usuario = await UsuarioRepository.Create({ nome: 'Teste' })

            const banco = await BancoRepository.Create({
                id: 260,
                usuario_id: 1,
                nome: 'Nu Pagamentos S.A.',
                ativo: true,
            })

            BancoRepository.Create({
                id: 756,
                usuario_id: 1,
                nome: 'Sicoob',
                ativo: true,
            })

            BancoRepository.Create({
                id: 208,
                usuario_id: 1,
                nome: 'Banco BTG Pactual S.A.',
                ativo: true,
            })

            BancoRepository.Create({
                id: 102,
                usuario_id: 1,
                nome: 'Banco XP S.A.',
                ativo: true,
            })

            const agencia = await AgenciaRepository.Create({
                usuario_id: usuario.id,
                banco_id: banco.id!,
                agencia: '0001',
                ativo: true,
            })

            const conta_financeira = await ContaFinanceiraRepository.Create({
                usuario_id: usuario.id,
                agencia_id: agencia.id!,
                nome: 'Conta Principal',
                numero: '17519640-5',
                tipo: 1,
                ativo: true,
            })

            const portador = await PortadorRepository.Create({
                usuario_id: usuario.id,
                conta_financeira_id: conta_financeira.id,
                nome: 'Pix - Nubank',
                tipo: 3,
                ativo: true,
            })

            const cartao = await CartaoRepository.Create({
                usuario_id: usuario.id,
                conta_financeira_id: conta_financeira.id,
                apelido: 'Cartão Nubank',
                tipo: 3,
                ativo: true,
            })

            const portador_cartao = await PortadorCartaoRepository.Create({
                usuario_id: usuario.id,
                portador_id: portador.id,
                cartao_id: cartao.id,
            })

            const categoria = await CategoriaRepository.Create({
                usuario_id: usuario.id,
                nome: 'Carro',
                ativo: true,
            })

            if (!categoria.id) {
                throw new Error('Erro ao criar categoria: ID não definido.')
            }

            const subcategoria = await SubcategoriaRepository.Create({
                usuario_id: usuario.id,
                nome: 'Gasolina',
                categoria_id: categoria.id,
                tipo: 1,
                ativo: true,
            })

            console.log('Dados de teste inseridos com sucesso!')
        }

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error)
    }
}

startServer()
