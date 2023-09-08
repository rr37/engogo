const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')
const { sequelize } = require('../models/index')

const journalController = {
  getJournals: (req, res, next) => {
    Journal.findAll({
      include: [
        { model: MissionCard, include: [{ model: CardImage }], nest: true },
        { model: User },
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
  apiGetJournal: (req, res, next) => {
    const journalId = req.params.id
    Journal.findByPk(journalId, {
      include: [
        {
          model: MissionCard,
          attributes: [],
          include: [
            {
              model: CardImage,
              attributes: ['cardImage'],
            },
          ],
        },
      ],
      attributes: [
        'weather',
        'q1',
        'q2',
        'q3',
        'createdAt'
      ],
      raw: true,
    })
      .then((journal) => {
        journal['cardImage'] = journal['MissionCard.CardImage.cardImage']
        delete journal['MissionCard.CardImage.id']
        delete journal['MissionCard.CardImage.cardImage']
        return res.json(journal)
      })
      .catch((err) => next(err))
  },
}

module.exports = journalController
