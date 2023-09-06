const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

// 個別 user 的感恩日記本頁面
router.get('/:id/journals', userController.getUserJournalsPage)

// 個別 user 的牌卡搜集庫頁面
router.get('/:id/missioncards', userController.getUserMissionCardsPage)

// 抽卡功能
router.post('/:id/drawcard', userController.drawCard)

router.get('/:id', (req, res, next) =>
  res.redirect(`./${req.params.id}/journals`)
)

module.exports = router