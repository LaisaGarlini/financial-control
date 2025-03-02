import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';

export class AgenciaModel extends Model {
  public id!: number;
  public usuario_id!: number;
  public banco_id!: number;
  public agencia!: string;
  public ativo!: boolean;
}

AgenciaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    banco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agencia: {
      type: DataTypes.STRING(6),
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
    modelName: 'agencia',
    tableName: 'agencia',
  },
);

Usuario.hasMany(AgenciaModel, { foreignKey: 'usuario_id' });
AgenciaModel.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export const Agencia = AgenciaModel;