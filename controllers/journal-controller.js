const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
  Like,
} = require('../models')
const { sequelize } = require('../models/index')
const dayjs = require('../helpers/dayjs-helper')

const journalController = {
  getJournals: (req, res, next) => {
    Journal.findAll({
      include: [
        {
          model: MissionCard,
          include: [{ model: CardImage }, { model: Mission }],
          nest: true,
        },
        { model: User },
        { model: Like, required: false },
        {
          model: Like,
          as: 'isLiked',
          where: { userId: req.user.id },
          required: false,
        },
      ],
      where: { status: 'done' },
      order: [['date', 'DESC']],
      nest: true,
    })
      .then((journals) => {
        // console.log(JSON.stringify(journals, null, 2))
        signInUserId = req.user.id
        journals = journals.map((journal) => ({
          ...journal.toJSON(),
          MissionCard: {
            ...journal.toJSON().MissionCard,
            id:
              journal.MissionCard.id.toString().length === 1
                ? journal.MissionCard.id.toString().padStart(2, '0')
                : journal.MissionCard.id,
          },
          Likes: journal.Likes.length > 0 ? journal.Likes.length : 0,
          isLiked: journal.isLiked.length > 0 ? true : false,
        }))
        res.render('explore', {
          journals,
          isExplore: true,
          signInUserId,
        })
      })
      .catch((err) => next(err))
  },
  apiGetJournal: (req, res, next) => {
    const journalId = req.params.id
    Journal.findByPk(journalId, {
      include: [
        {
          model: MissionCard,
          attributes: ['id'],
          include: [
            {
              model: CardImage,
              attributes: ['cardImage'],
            },
            {
              model: Mission,
              attributes: ['mission'],
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
        const {
          'MissionCard.id': cardId,
          'MissionCard.Mission.mission': cardMission,
          'MissionCard.CardImage.cardImage': cardImage,
          createdAt,
        } = journal

        journal.cardId = String(cardId).padStart(2, '0')
        journal.cardMission = cardMission
        journal.cardImage = cardImage
        journal.createdAt = dayjs(createdAt).format('YYYYMMDD')

        delete journal['MissionCard.id']
        delete journal['MissionCard.Mission.id']
        delete journal['MissionCard.Mission.mission']
        delete journal['MissionCard.CardImage.id']
        delete journal['MissionCard.CardImage.cardImage']
        return res.json(journal)
      })
      .catch((err) => next(err))
  },
  // 更改 journal 資料
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
  apiCheckJournalLike: async (req, res, next) => {
    // 拿到要新增 journal id
    const journalId = req.params.id
    const userId = req.user.id
    try {
      // 查詢是否已按愛心
      const like = await Like.findOne({
        where: {
          userId,
          journalId,
        },
      })

      // 如果已按愛心，返回 { alreadyLiked: true }
      // 如果未按愛心，返回 { alreadyLiked: false }
      if (like) {
        res.json({ alreadyLiked: true })
      } else {
        res.json({ alreadyLiked: false })
      }
    } catch (error) {
      next(error)
    }
  },
  apiLikeJournal: (req, res, next) => {
    // 拿到要新增 journal id
    const journalId = req.params.id
    const userId = req.user.id
    // 搜尋要被喜歡的 journal 資料
    Journal.findByPk(journalId, {
      include: {
        model: Like,
        where: { userId },
        required: false,
      },
      attributes: [],
      raw: true,
      nest: true,
    })
      .then((journal) => {
        if (!journal) throw new Error("Journal doesn't exist!")
        // 若已存在該筆紀錄則報錯
        if (journal.Likes.id) throw new Error('You have liked this!')
        // 將紀錄寫進資料庫
        return Like.create({
          userId: userId,
          journalId: journalId,
        })
      })
      .then(() => {
        // 更新日記的愛心數量
        return Like.count({
          where: {
            journalId,
          },
        })
      })
      // 重新導回頁面
      .then((likeCount) => {
        res.json({likeCount})
      })
      .catch((err) => next(err))
  },
  apiUnLikeJournal: (req, res, next) => {
    // 拿到要取消喜歡的 journal id
    const journalId = req.params.id
    const userId = req.user.id
    // 搜尋要被喜歡的 journal 資料
    Journal.findByPk(journalId, {
      include: {
        model: Like,
        where: { userId },
        required: false,
      },
      attributes: [],
      nest: true,
    })
      .then((journal) => {
        const like = journal.Likes[0]
        if (!journal) throw new Error("Journal doesn't exist!")
        // 若未存在該筆紀錄則報錯
        if (!like) throw new Error('You have not liked this!')
        // 將紀錄從資料庫刪除
        return like.destroy()
      })
      .then(() => {
        // 更新日記的愛心數量
        return Like.count({
          where: {
            journalId,
          },
        })
      })
      // 重新導回頁面
      .then((likeCount) => {
        res.json({likeCount})
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
