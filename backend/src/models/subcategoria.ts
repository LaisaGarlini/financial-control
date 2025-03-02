import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import Categoria from './categoria';

class SubCategoria extends Model {
  public id!: number;
  public usuario_id!: number;
  public nome!: string;
  public categoria_id!: number;
  public tipo!: number;
  public ativo!: boolean;
}

SubCategoria.init(
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
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    tipo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: '1 - Entrada; 2 - Saída',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'subcategoria',
    tableName: 'subcategoria',
  },
);

Usuario.hasMany(SubCategoria, { foreignKey: 'usuario_id' });
SubCategoria.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Categoria.hasMany(SubCategoria, { foreignKey: 'categoria_id' });
SubCategoria.belongsTo(Categoria, { foreignKey: 'categoria_id' });

export default SubCategoria;