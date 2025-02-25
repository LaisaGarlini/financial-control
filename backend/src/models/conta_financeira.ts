import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import Agencia from './agencia';

class ContaFinanceira extends Model {
  public id!: number;
  public usuario_id!: number;
  public agencia_id!: number;
  public nome!: string;
  public numero!: string;
  public tipo!: number;
  public ativo!: boolean;
}

ContaFinanceira.init(
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
    agencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agencia,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: '1 - Corrente, 2 - Poupança, 3 - Conta Salário, 4 - Investimentos',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'conta_financeira',
    tableName: 'conta_financeira',
  },
);

Usuario.hasMany(ContaFinanceira, { foreignKey: 'usuario_id' });
ContaFinanceira.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Agencia.hasMany(ContaFinanceira, { foreignKey: 'agencia_id' });
ContaFinanceira.belongsTo(Agencia, { foreignKey: 'agencia_id' });

export default ContaFinanceira;