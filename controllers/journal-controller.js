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
        res.render('explore', { journals, isExplore: true })
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
