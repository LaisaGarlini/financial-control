import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { Usuario } from './usuario'

class BancoModel extends Model {
    public id!: number
    public usuario_id!: number
    public nome!: string
    public ativo!: boolean
}

BancoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            // autoIncrement: true,
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
)

Usuario.hasMany(BancoModel, { foreignKey: 'usuario_id' })
BancoModel.belongsTo(Usuario, { foreignKey: 'usuario_id' })

export const Banco = BancoModel
