'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Pagamentos', 'userId', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Pagamentos', 'userId');
    },
};

