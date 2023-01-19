const seed = require("./database/seed");

module.exports = {
  create: function (req, res) {
    seed.seedDb()
      .then(res.sendStatus.bind(res, 200))
      .catch(res.sendStatus.bind(res, 400));
  },

  delete: function (req, res) {
    seed.deleteSeedTerms()
      .then(res.sendStatus.bind(res, 200))
      .catch(res.sendStatus.bind(res, 400));
  }
};