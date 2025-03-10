import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { Usuario } from './usuario'
import { Categoria } from './categoria'

class SubCategoriaModel extends Model {
    public id!: number
    public usuario_id!: number
    public nome!: string
    public categoria_id!: number
    public tipo!: number
    public ativo!: boolean
}

SubCategoriaModel.init(
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
            validate: {
                notEmpty: true,
            },
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
            validate: {
                isIn: [[1, 2]],
            },
            comment: '1 - Despesa, 2 - Receita',
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
)

Usuario.hasMany(SubCategoriaModel, { foreignKey: 'usuario_id' })
SubCategoriaModel.belongsTo(Usuario, { foreignKey: 'usuario_id' })

Categoria.hasMany(SubCategoriaModel, { foreignKey: 'categoria_id' })
SubCategoriaModel.belongsTo(Categoria, { foreignKey: 'categoria_id' })

export const SubCategoria = SubCategoriaModel
