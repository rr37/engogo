const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')
const bcrypt = require('bcryptjs')

const userController = {
  getUserJournalsPage: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      include: [
        {
          model: Journal,
          include: [{ model: MissionCard, include: [{ model: CardImage }] }],
          nest: true,
        },
      ],
      nest: true,
    })
      .then((userData) => {
        // console.log(JSON.stringify(userData, null, 2))
        userData = userData.toJSON()
        const userJournals = userData.Journals
        let emptyData = false
        if (!userJournals || userJournals.length === 0) {
          emptyData = true
        }
        res.render('userPage', { userData, userJournals, emptyData })
      })
      .catch((err) => next(err))
  },
  getUserMissionCardsPage: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      include: [
        {
          model: Journal,
          include: [{ model: MissionCard, include: [{ model: CardImage }] }],
          nest: true,
        },
      ],
      nest: true,
    })
      .then((userData) => {
        // console.log(JSON.stringify(userData, null, 2))
        userData = userData.toJSON()
        const userMissionCards = userData.Journals
        let emptyData = false
        if (!userMissionCards || userMissionCards.length === 0) {
          emptyData = true
        }
        res.render('userPage', { userData, userMissionCards, emptyData })
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
    res.redirect('/explore')
  },
  logout: (req, res, next) => {
    req.logout()
    req.flash('success_messages', '你已成功登出！')
    res.redirect('/signin')
  },
}

module.exports = userController
