'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {
        static associate(models) {
            // Associações podem ser definidas aqui
        }
    }

    Usuario.init(
        {
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'usuario', // Define 'usuario' como padrão
                validate: {
                    isIn: [['usuario', 'fornecedor']], // Aceita apenas 'usuario' ou 'fornecedor'
                },
            },
        },
        {
            sequelize,
            modelName: 'Usuario',
        }
    );

    return Usuario;
};
