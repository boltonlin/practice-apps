const db = require("./models");

module.exports = {

  createOrUpdate: function (req, res) {
    const { type, payload } = req.body;
    switch (type) {
      case 'user':
        return db
          .find(type, payload)
          .then(found => {
            if (!found[0].length) return db.insert(type, payload);
            else return db.update(type, payload);
          })
          .then(results => {
            if (results[0].insertId > 0) {
              return db.createSession(req.session_id, results[0].insertId);
            } else return null;
          })
          .then(res.sendStatus.bind(res, 201))
          .catch(err => res.status(400).send(err));
        break;
      case 'address':
      case 'payment':
        return db
          .findSession(req.session_id)
          .then(results => {
            if (!results[0].length) res.sendStatus(400);
            payload.user_id = results[0][0].user_id;
            return db.find(type, payload);
          })
          .then(found => {
            if (!found[0].length) return db.insert(type, payload);
            else return db.update(type, payload);
          })
          .then(results => res.status(201).send(results))
          .catch(err => res.status(400).send(err));
        break;
      default:
        res.sendStatus(201);
    }

  },

  fetch: function (req, res) {

  },

  logout: function (req, res) {
    return db.clearSession(req.session_id);
  }

}