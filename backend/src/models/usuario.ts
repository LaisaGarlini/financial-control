import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class UsuarioModel extends Model {
    public id!: number
    public nome!: string
}

UsuarioModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'usuario',
        tableName: 'usuario',
    },
)

export const Usuario = UsuarioModel
