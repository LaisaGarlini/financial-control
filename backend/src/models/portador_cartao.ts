import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import Cartao from './cartao';
import Portador from './portador';

class PortadorCartao extends Model {
  public id!: number;
  public usuario_id!: number;
  public portador_id!: number;
  public cartao_id!: number;
}

PortadorCartao.init(
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
    portador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Portador,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    cartao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cartao,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'portador_cartao',
    tableName: 'portador_cartao',
  },
);

Usuario.hasMany(PortadorCartao, { foreignKey: 'usuario_id' });
PortadorCartao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Portador.hasMany(PortadorCartao, { foreignKey: 'portador_id' });
PortadorCartao.belongsTo(Portador, { foreignKey: 'portador_id' });

Cartao.hasMany(PortadorCartao, { foreignKey: 'cartao_id' });
PortadorCartao.belongsTo(Cartao, { foreignKey: 'cartao_id' });

export default PortadorCartao;