const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')

const journalController = {
  getJournals: (req, res, next) => {
    Journal.findAll({
      include: [
        { model: MissionCard, include: [{ model: CardImage }], nest: true },
        { model: User }
      ],
      raw: true,
      nest: true,
    })
      .then((journals) => {
        signInUserId = req.user.id
        res.render('explore', { journals, isExplore: true, signInUserId })
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
