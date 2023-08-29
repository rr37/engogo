'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 新增管理員資料
    await queryInterface.bulkInsert('Users', [
      {
        account: 'root',
        name: 'root',
        email: 'root@example.com',
        password: await bcrypt.hash('root', 10),
        avatar: `https://loremflickr.com/320/320/headshot/?random=${
          Math.random() * 10
        }`,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    // 新增五名使用者資料
    const userData = []
    for (let i = 0; i < 5; i++) {
      const user = {
        account: `user${i}`,
        email: `user${i}@example.com`,
        name: `user${i}`,
        password: await bcrypt.hash('12345678', 10),
        avatar: `https://loremflickr.com/320/240/headshot/?random=${
          Math.random() * 10
        }`,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      }
      userData.push(user)
    }
    await queryInterface.bulkInsert('Users', userData)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  },
}
