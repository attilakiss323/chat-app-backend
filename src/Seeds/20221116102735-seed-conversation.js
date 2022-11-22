'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Conversations', [{
      userId: 1,
      messages:  JSON.stringify([
       { name: "Seed One", text: "Seed text" },
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Conversations', null, {});
  }
};
