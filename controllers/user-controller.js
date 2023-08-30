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
      User.findByPk(userId, {
        include: [
          {
            model: Journal,
            include: [{ model: MissionCard, include: [{ model: CardImage }] }],
            nest: true,
            
          },
        ],
        nest: true,
      })
        .then((userData) => {
          // console.log(JSON.stringify(userData, null, 2))
          userData = userData.toJSON()
          const userJournals = userData.Journals
          console.log(userJournals)
          res.render('userPage', { userData, userJournals })
        })
        .catch((err) => next(err))
  },
}

module.exports = userController
