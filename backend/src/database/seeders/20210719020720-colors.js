'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('colors', [
      { name: 'Preto', created_at: new Date(), updated_at: new Date() },
      { name: 'Azul', created_at: new Date(), updated_at: new Date() },
      { name: 'Cinza', created_at: new Date(), updated_at: new Date() },
      { name: 'Branco', created_at: new Date(), updated_at: new Date() },
      { name: 'Prata', created_at: new Date(), updated_at: new Date() },
      { name: 'Vermelho', created_at: new Date(), updated_at: new Date() },
      { name: 'Verde', created_at: new Date(), updated_at: new Date() },
      { name: 'Amarelo', created_at: new Date(), updated_at: new Date() },
      { name: 'Marrom', created_at: new Date(), updated_at: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('colors', null, {});
  }
};
