import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { Usuario } from './usuario'

class PessoaModel extends Model {
    public id!: number
    public usuario_id!: number
    public razao_social!: string
    public nome_fantasia!: string
    public natureza!: string
    public cpf_cnpj!: string
    public ie_rg!: string
    public observacao!: string
    public ativo!: boolean
    public data_cadastro!: Date
}

PessoaModel.init(
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
        razao_social: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        nome_fantasia: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        natureza: {
            type: DataTypes.CHAR(1),
            allowNull: false,
        },
        cpf_cnpj: {
            type: DataTypes.STRING(18),
            allowNull: true,
            unique: true,
        },
        ie_rg: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        data_cadastro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'pessoa',
        tableName: 'pessoa',
        timestamps: false,
    },
)

Usuario.hasMany(PessoaModel, { foreignKey: 'usuario_id' })
PessoaModel.belongsTo(Usuario, { foreignKey: 'usuario_id' })

export const Pessoa = PessoaModel
