'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('starbuzzcoffees', [{
      productName: 'Turkish Coffee',
      description: 'Grounded coffee',
      price: '3',
      imageurl: 'Not set yet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'American Coffee',
      description: 'Mild',
      price: '3.50',
      imageurl: 'Not set yet',
      createdAt: new Date(),
      updatedAt: new Date()

    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
