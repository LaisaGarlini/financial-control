import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Usuario extends Model {
  public id!: number;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'usuario',
    tableName: 'usuario',
  },
);

export default Usuario;