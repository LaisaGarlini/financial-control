import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { Usuario } from './usuario'
import { Pessoa } from './pessoa'
import { SubCategoria } from './subcategoria'

class MovimentoFinanceiroModel extends Model {
    public id!: number
    public usuario_id!: number
    public descricao!: string
    public subcategoria_id!: number
    public pessoa_id!: number
    public situacao!: number
    public valor_bruto!: number
    public valor_pago!: number
    public data_vencimento!: Date
    public data_pagamento!: Date
    public previsao!: boolean
    public observacao!: string
    public data_cadastro!: Date
}

MovimentoFinanceiroModel.init(
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
                model: 'usuario',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        descricao: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        subcategoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subcategoria',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        pessoa_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pessoa',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        situacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3]], // 1 = Pago; 2 = Pendente;
            },
        },
        valor_bruto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
            },
        },
        valor_pago: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                isDecimal: true,
            },
        },
        data_vencimento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_pagamento: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        previsao: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        data_cadastro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'movimento_financeiro',
        tableName: 'movimento_financeiro',
        timestamps: false,
    },
)

Usuario.hasMany(MovimentoFinanceiroModel, { foreignKey: 'usuario_id' })
MovimentoFinanceiroModel.belongsTo(Usuario, { foreignKey: 'usuario_id' })

SubCategoria.hasMany(MovimentoFinanceiroModel, { foreignKey: 'subcategoria_id' })
MovimentoFinanceiroModel.belongsTo(SubCategoria, { foreignKey: 'subcategoria_id' })

Pessoa.hasMany(MovimentoFinanceiroModel, { foreignKey: 'pessoa_id' })
MovimentoFinanceiroModel.belongsTo(Pessoa, { foreignKey: 'pessoa_id' })

export const MovimentoFinanceiro = MovimentoFinanceiroModel
