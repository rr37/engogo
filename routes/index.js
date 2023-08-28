const express = require('express')
const router = express.Router()

const journalController = require('../controllers/journal-controller')

// 探索頁面：取得所有 journals
router.get('/explore', journalController.getJournals)

// 首頁：
router.get('/', (req, res, next) => res.render('userPage'))

module.exports = router
