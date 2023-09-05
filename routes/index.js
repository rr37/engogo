const express = require('express')
const router = express.Router()

const users = require('./modules/users')

const journalController = require('../controllers/journal-controller')
const userController = require('../controllers/user-controller')

router.get('/signup', userController.signUpPage)
router.get('/signin', userController.signInPage)

// users 頁面交給 userController 處理
router.use('/users', users)

// 探索頁面：取得所有 journals
router.get('/explore', journalController.getJournals)

// 首頁：
router.get('/', (req, res, next) => res.render('userPage', { isHome: true }))

module.exports = router
