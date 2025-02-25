import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import ContaFinanceira from './conta_financeira';

class Cartao extends Model {
  public id!: number;
  public usuario_id!: number;
  public conta_financeira_id!: number;
  public apelido!: string;
  public tipo!: number;
  public ativo!: boolean;
}

Cartao.init(
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
    conta_financeira_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ContaFinanceira,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    apelido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: '1 = Débito; 2 = Crédito; 3 = Débito e Crédito',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'cartao',
    tableName: 'cartao',
  },
);

Usuario.hasMany(Cartao, { foreignKey: 'usuario_id' });
Cartao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

ContaFinanceira.hasMany(Cartao, { foreignKey: 'conta_financeira_id' });
Cartao.belongsTo(ContaFinanceira, { foreignKey: 'conta_financeira_id' });

export default Cartao;