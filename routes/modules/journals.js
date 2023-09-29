const express = require('express')
const router = express.Router()
const journalController = require('../../controllers/journal-controller')

// 更新 journal 資料
router.post('/:id', journalController.postJournal)

module.exports = router
