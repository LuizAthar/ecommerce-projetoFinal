'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pagamento.init({
    tipoPagamento: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    status: DataTypes.STRING,
    dataPagamento: DataTypes.DATE,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pagamento',
  });
  return Pagamento;
};