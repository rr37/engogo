const {
  MissionCard,
  Mission,
  CardImage,
  CardCollection,
  User,
  Journal,
} = require('../models')

const userController = {
  getUserJournalsPage: (req, res, next) => {
    const userId = req.params.id
    Promise.all([
      User.findByPk(userId, { raw: true }),
      Journal.findAll({
        where: { userId },
        include: [
          { model: MissionCard, include: [{ model: CardImage }], nest: true },
          { model: User },
        ],
        raw: true,
        nest: true,
      }),
    ])
      // User.findByPk(userId, {
      //   include: [
      //     {
      //       model: Journal,
      //       include: [{ model: MissionCard, include: [{ model: CardImage }] }],
      //       nest: true,
      //       raw: true,
      //     },
      //   ],
      //   raw: true,
      //   nest: true,
      // })
      // Journal.findAll({
      //   include: [{ model: User }],
      //   where: { userId },
      //   raw: true,
      //   nest: true,
      // })
      .then(([userData, userJournals]) => {
        console.log(userData)
        res.render('userPage', { userData, userJournals })
      })
      .catch((err) => next(err))
  },
}

module.exports = userController
