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
      ],
      raw: true,
      nest: true,
    })
      .then((journals) => {
        console.log(journals[0].MissionCard)
        res.render('explore', { journals })
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
