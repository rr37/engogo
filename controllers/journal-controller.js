const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')
const { sequelize } = require('../models/index')
const dayjs = require('../helpers/dayjs-helper')

const journalController = {
  getJournals: (req, res, next) => {
    Journal.findAll({
      include: [
        { model: MissionCard, include: [{ model: CardImage }], nest: true },
        { model: User },
      ],
      where: {status: 'done'},
      order: [['date', 'DESC']],
      raw: true,
      nest: true,
    })
      .then((journals) => {
        signInUserId = req.user.id
        res.render('explore', { journals, isExplore: true, signInUserId })
      })
      .catch((err) => next(err))
  },
  apiGetJournal: (req, res, next) => {
    const journalId = req.params.id
    Journal.findByPk(journalId, {
      include: [
        {
          model: MissionCard,
          attributes: [],
          include: [
            {
              model: CardImage,
              attributes: ['cardImage'],
            },
          ],
        },
      ],
      attributes: [
        'weather',
        'q1',
        'q2',
        'q3',
        'listen',
        'speak',
        'read',
        'write',
        'think',
        'createdAt',
      ],
      raw: true,
    })
      .then((journal) => {
        journal['cardImage'] = journal['MissionCard.CardImage.cardImage']
        journal['createdAt'] = dayjs(journal['createdAt']).format(
          'YYYYMMDD'
        )
        delete journal['MissionCard.CardImage.id']
        delete journal['MissionCard.CardImage.cardImage']
        return res.json(journal)
      })
      .catch((err) => next(err))
  },
  postJournal: (req, res, next) => {
    // 拿到前端資料
    const { weather, q1, q2, q3, listen, speak, read, write, think } = req.body
    const journalId = req.params.id
    return (
      Journal.findByPk(journalId)
        .then((journal) => {
          const checkJournal = journal.toJSON()
          const signInUserId = req.user.id
          // 確認變更者是否為日記擁有者
          if (checkJournal.userId.toString() !== signInUserId.toString()) {
            // 若不是要報錯
            req.flash('error_messages', '不能改別人的日記！小壞蛋！')
            return res.redirect('back')
          }
          // 如果有未填的欄位則不修改狀態
          if (
            !weather ||
            !q1 ||
            !q2 ||
            !q3 ||
            weather.trim() === 0 ||
            q1.trim() === 0 ||
            q2.trim() === 0 ||
            q3.trim() === 0
          ) {
            return journal.update({
              weather,
              q1,
              q2,
              q3,
              listen,
              speak,
              read,
              write,
              think,
            })
          }
          // 若資料都填寫完成，將狀態改為已完成
          // 將前端傳回來的資料寫進 Journal 資料表中
          return journal.update({
            weather,
            q1,
            q2,
            q3,
            listen,
            speak,
            read,
            write,
            think,
            status: 'done',
          })
        })
        // 重新導向到該使用者的個人頁面
        .then(() => res.redirect('back'))
        .catch((err) => next(err))
    )
  },
}

module.exports = journalController
