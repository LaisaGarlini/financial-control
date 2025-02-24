import sequelize from './config/database';
import banco from './models/banco';
console.log('Modelo banco importado:', banco);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ force: false });
    console.log('Banco de dados sincronizado.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();