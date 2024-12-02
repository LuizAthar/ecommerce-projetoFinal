'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Fornecedor extends Model {
    static associate(models) {
      // Associações, se necessário
    }
  }

  Fornecedor.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Fornecedor',
      tableName: 'fornecedores',
    }
  );

  return Fornecedor;
};
