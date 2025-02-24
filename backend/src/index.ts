import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
// import banco from './models/banco';
// import usuario from './models/usuario';
import bancoRoutes from './routes/bancoRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
// console.log('Modelo banco importado:', banco);
// console.log('Modelo banco importado:', usuario);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', bancoRoutes);
app.use('/api', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Backend do controle financeiro está rodando!');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // await sequelize.sync({ force: false });
    // console.log('Banco de dados sincronizado.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();