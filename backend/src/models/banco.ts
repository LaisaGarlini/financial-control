import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Banco extends Model {
  public id!: number;
  public usuario_id!: number;
  public nome!: string;
  public ativo!: boolean;
}

Banco.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'banco',
    tableName: 'banco',
  },
);

export default Banco;