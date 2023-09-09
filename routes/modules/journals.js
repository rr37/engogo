const express = require('express')
const router = express.Router()
const journalController = require('../../controllers/journal-controller')

// 探索頁面：取得所有 journals
router.post('/:id', journalController.postJournal)

module.exports = router
