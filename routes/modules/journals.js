const express = require('express')
const router = express.Router()
const journalController = require('../../controllers/journal-controller')

// 對 journal 表示喜歡
router.post('/:id/like', journalController.postLike)

// 對 journal 取消喜歡
router.post('/:id/unlike', journalController.postUnlike)

// 更新 journal 資料
router.post('/:id', journalController.postJournal)

module.exports = router
