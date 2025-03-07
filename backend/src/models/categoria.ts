import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { Usuario } from './usuario'

class CategoriaModel extends Model {
    public id!: number
    public usuario_id!: number
    public nome!: string
    public ativo!: boolean
}

CategoriaModel.init(
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
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'categoria',
        tableName: 'categoria',
    },
)

Usuario.hasMany(CategoriaModel, { foreignKey: 'usuario_id' })
CategoriaModel.belongsTo(Usuario, { foreignKey: 'usuario_id' })

export const Categoria = CategoriaModel
