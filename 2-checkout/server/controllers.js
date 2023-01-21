const db = require("./models");

const TYPES = {
  1: 'users',
  2: 'shipping_info',
  3: 'payment_info'
}

module.exports = {

  createOrUpdate: function (req, res) {
    const { type, payload } = req.body;
    const session_id = req.session_id;
    return db
      .find(type, payload)
      .then(found => {
        const findings = found[0];
        if (!findings.length) return db.insert(type, payload);
        else return db.update(type, payload);
      })
      .then(results => res.sendStatus(201))
      .catch(err => res.status(400).send(err));
  },

  fetch: function (req, res) {

  }

}