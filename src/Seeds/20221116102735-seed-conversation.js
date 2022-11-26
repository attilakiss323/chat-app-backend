'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversation', [{
      userId: 1,
      contact: "john.doe@mail.com",
      messages:  JSON.stringify([
       { name: "John Doe", text: "Message text" },
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('conversation', [{
      userId: 1,
      contact: "sam.smith@mail.com",
      messages:  JSON.stringify([
       { name: "Sam Smith", text: "Message text" },
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('conversation', [{
      userId: 1,
      contact: "user2@mail.com",
      messages:  JSON.stringify([
       { name: "User2 Test", text: "Hello" },
       { name: "User Test", text: "Hi" },
       { name: "User2 Test", text: "What's up?" },
       { name: "User Test", text: "Creating seeds" },
       { name: "User2 Test", text: "Good luck!" },
       { name: "User Test", text: "Thanks" },
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('conversation', [{
      userId: 2,
      contact: "user@mail.com",
      messages:  JSON.stringify([
       { name: "User2 Test", text: "Hello" },
       { name: "User Test", text: "Hi" },
       { name: "User2 Test", text: "What's up?" },
       { name: "User Test", text: "Creating seeds" },
       { name: "User2 Test", text: "Good luck!" },
       { name: "User Test", text: "Thanks" },
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('conversation', null, {});
  }
};
