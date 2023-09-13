'use strict'
// 引入 faker
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 為每個使用者建立感恩日記
    // 查詢目前的 User id
    const users = await queryInterface.sequelize.query(`SELECT id FROM Users`, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })
    // 新增變數儲存假資料
    const journalData = []
    // 遍歷每個使用者
    for (const user of users) {
      // 在每個欄位中填入假資料
      for (let i = 0; i < 5; i++) {
        const journal = {
          date: faker.date.past(),
          weather: faker.random.word(),
          q1: faker.lorem.sentence(),
          q2: faker.lorem.sentence(),
          q3: faker.lorem.sentence(),
          listen: Math.ceil(Math.random() * 5),
          speak: Math.ceil(Math.random() * 5),
          read: Math.ceil(Math.random() * 5),
          write: Math.ceil(Math.random() * 5),
          think: Math.ceil(Math.random() * 5),
          status: 'done',
          user_id: user.id,
          mission_card_id: Math.ceil(Math.random() * 52),
          created_at: faker.date.past(),
          updated_at: faker.date.past(),
        }
        journalData.push(journal)
      }
    }
    // 對資料庫發出建立指令
    await queryInterface.bulkInsert('Journals', journalData)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Journals', {})
  },
}
