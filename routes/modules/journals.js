const express = require('express')
const router = express.Router()
const journalController = require('../../controllers/journal-controller')

// 探索頁面：取得所有 journals
router.get('/explore', journalController.getJournals)

module.exports = router
