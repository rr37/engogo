const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const { authenticator, authenticatedAdmin } = require('../middleware/auth')

const users = require('./modules/users')
const journals = require('./modules/journals')

const journalController = require('../controllers/journal-controller')
const userController = require('../controllers/user-controller')

// 探索頁面：取得所有 journals
router.get('/explore', authenticator, journalController.getJournals)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signup',
    failureFlash: true,
  }),
  userController.signIn
  )
  // users 頁面交給 userController 處理
  router.use('/users',authenticator, users)
  
  // journals 頁面交給 journals 處理
  router.use('/journals', authenticator, journals)

  router.get('/api/journals/:id', authenticator, journalController.apiGetJournal)
  
  router.get('/logout', userController.logout)

// 首頁：
router.get('/', (req, res, next) => res.redirect('/explore'))

module.exports = router
