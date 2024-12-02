'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cesta extends Model {
    static associate(models) {
      // Associação com Produto
      Cesta.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: 'produto',
      });

      // Associação com o Usuário
      Cesta.belongsTo(models.Usuario, {
        foreignKey: 'userId',
        as: 'usuario',
      });
    }
  }

  Cesta.init(
    {
      produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id',
        },
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // A quantidade deve ser no mínimo 1
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Cesta',
    }
  );

  return Cesta;
};
