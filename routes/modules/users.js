const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

// 個別 user 的頁面
router.get('/:id/journals', userController.getUserJournalsPage)

router.get('/:id', (req, res, next) =>
  res.redirect(`./${req.params.id}/journals`)
)

module.exports = router