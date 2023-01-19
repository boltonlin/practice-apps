const db = require('./db');

module.exports = {
  create: function (req, res) {
    db.saveTerm(req.body)
      .then(res.sendStatus.bind(res, 201));
  },

  get: function (req, res) {
    db.retrieveTerm(req.query)
      .then(results => res.status(200).send(results))
      .catch(err => res.status(400).send(err));
  },

  update: function (req, res) {
    db.updateTerm(req.body)
      .then(result => {
        if (!result) res.sendStatus(400);
        else res.sendStatus(200);
      });
  },

  delete: function (req, res) {
    const { word, partOfSpeech, index } = req.query;
    if (index === null | undefined) {
      db.deleteTerm({ word, partOfSpeech })
        .then(res.sendStatus.bind(res, 200))
        .catch(err => res.status(400).send(err));
    } else {
      db.deleteDefinition(req.query)
        .then(res.sendStatus.bind(res, 200))
        .catch(err => res.status(400).send(err));
    }
  },
}