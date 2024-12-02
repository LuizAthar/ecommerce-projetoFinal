'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('usuarios', 'tipo', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'usuario', // Define 'usuario' como padrão
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('usuarios', 'tipo');
    }
};
