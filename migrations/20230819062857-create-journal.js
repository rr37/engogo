'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      weather: {
        type: Sequelize.STRING,
      },
      q1: {
        type: Sequelize.TEXT,
      },
      q2: {
        type: Sequelize.TEXT,
      },
      q3: {
        type: Sequelize.TEXT,
      },
      listen: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
      },
      speak: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
      },
      read: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
      },
      write: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
      },
      think: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
      },
      status: {
        defaultValue: 'inProgress',
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      mission_card_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Journals');
  }
};