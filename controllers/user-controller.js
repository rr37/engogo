const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')

const userController = {
  getUserJournalsPage: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      include: [
        {
          // 找出已完成挑戰的日記跟卡片
          model: Journal,
          where: { status: 'done' },
          include: [
            { model: MissionCard, include: [{ model: CardImage }] },
            { model: User },
          ],
          nest: true,
          required: false,
        },
        {
          // 找出還在挑戰中日記跟卡片
          model: Journal,
          as: 'InProgressJournal',
          where: { status: 'inProgress' },
          include: [
            {
              model: MissionCard,
              include: [{ model: CardImage }, { model: Mission }],
            },
            { model: User },
          ],
          nest: true,
          required: false,
        },
      ],
      order: [[Journal, 'date', 'DESC']],
      nest: true,
    })
      .then((userData) => {
        // console.log(JSON.stringify(userData, null, 2))
        const signInUserId = req.user.id
        let userJournals, userInProgressJournal
        userData = userData.toJSON()
        if (userData.Journals.length !== 0) {
          userJournals = userData.Journals
        }
        if (userData.InProgressJournal.length !== 0) {
          userInProgressJournal = userData.InProgressJournal
          userInProgressJournal[0].MissionCard.id =
            userInProgressJournal[0].MissionCard.id.toString().padStart(2, '0')
        }
        let emptyData = true
        if (userJournals || userInProgressJournal) {
          emptyData = false
        }
        res.render('userPage', {
          isUserJournalsPage: true,
          userData,
          userJournals,
          userInProgressJournal,
          emptyData,
          signInUserId,
        })
      })
      .catch((err) => next(err))
  },
  getUserMissionCardsPage: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      include: [
        {
          // 找出已完成挑戰的日記跟卡片
          model: Journal,
          include: [{ model: MissionCard, include: [{ model: CardImage }] }],
          nest: true,
        },
        {
          // 找出還在挑戰中的日記跟卡片
          model: Journal,
          as: 'InProgressJournal',
          where: { status: 'inProgress' },
          include: [
            {
              model: MissionCard,
              include: [{ model: CardImage }, { model: Mission }],
            },
            { model: User },
          ],
          nest: true,
          required: false,
        },
      ],
      nest: true,
    })
      .then((userData) => {
        // console.log(JSON.stringify(userData, null, 2))
        const signInUserId = req.user.id
        userData = userData.toJSON()
        let userMissionCards, userInProgressJournal
        if (userData.Journals.length !== 0) {
          userMissionCards = userData.Journals
        }
        if (userData.InProgressJournal.length !== 0) {
          userInProgressJournal = userData.InProgressJournal
          userInProgressJournal[0].MissionCard.id =
            userInProgressJournal[0].MissionCard.id.toString().padStart(2, '0')
        }
        let emptyData = true
        if (userMissionCards || userInProgressJournal) {
          emptyData = false
        }
        res.render('userPage', {
          isUserMissionCardsPage: true,
          userData,
          userMissionCards,
          userInProgressJournal,
          emptyData,
          signInUserId,
        })
      })
      .catch((err) => next(err))
  },
  drawCard: (req, res, next) => {
    // 驗證抽卡者是否為本人
    const signInUserId = req.user.id
    const userId = req.params.id
    if (signInUserId.toString() !== userId.toString()) {
      // 如果不是本人抽卡要給錯誤提示
      req.flash('error_messages', '不能抽別人的卡！小壞蛋！')
      return res.redirect('back')
    }
    // 如果是本人
    Promise.all([
      // 刪除現有的未完成卡片跟日記
      Journal.destroy({
        where: { userId: signInUserId, status: 'inProgress' },
      }),
      // 隨機給一張卡片
      MissionCard.findOne({
        order: Sequelize.literal('RAND()'),
        attributes: ['id'],
      }),
    ])
      .then(async ([destroyJournal, randomCard]) => {
        const signInUserId = req.user.id
        const missionCardId = randomCard.id
        const date = new Date()
        randomCard = randomCard.toJSON()
        console.log(randomCard)
        // 新增新的感恩日記，並設定表格內必填欄位
        await Journal.create({ userId: signInUserId, missionCardId, date })
        // 重新轉址回個人頁面
        res.redirect(`/users/${signInUserId}`)
      })
      .catch((err) => next(err))
  },
  signUpPage: (req, res, next) => {
    res.render('signUp', { layout: 'signIn&Up' })
  },
  signUp: (req, res, next) => {
    const { account, email, name, password, checkPassword } = req.body
    const errors = []
    if (!account || !name || !email || !password || !checkPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== checkPassword) {
      errors.push({ message: '密碼與確認密碼不一致。' })
    }
    if (errors.length) {
      return res.render('signup', {
        errors,
        account,
        name,
        email,
        password,
        checkPassword,
        layout: 'signIn&Up',
      })
    }
    return Promise.all([
      User.findOne({ where: { account, role: 'user' } }),
      User.findOne({ where: { email, role: 'user' } }),
    ]).then(([accountUser, emailUser]) => {
      if (emailUser) {
        errors.push({ message: '電子信箱已被使用！' })
      }
      if (accountUser) {
        errors.push({ message: '帳號已被使用！' })
      }
      if (errors.length) {
        return res.render('signup', {
          errors,
          account,
          name,
          email,
          password,
          checkPassword,
          layout: 'signIn&Up',
        })
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            account,
            name,
            email,
            password: hash,
          })
        )
        .then(() => {
          req.flash('success_messages', '成功註冊帳號。')
          res.redirect('/signin')
        })
        .catch((err) => next(err))
    })
  },
  signInPage: (req, res, next) => {
    res.render('signIn', { layout: 'signIn&Up' })
  },
  signIn: (req, res, next) => {
    const signInUserId = req.user.id
    res.redirect(`/users/${signInUserId}`)
  },
  logout: (req, res, next) => {
    req.logout()
    req.flash('success_messages', '你已成功登出！')
    res.redirect('/signin')
  },
}

module.exports = userController
