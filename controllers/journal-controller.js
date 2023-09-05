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
        console.log(journals[0])
        userData = req.user
        res.render('explore', { journals, isExplore: true, userData })
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
