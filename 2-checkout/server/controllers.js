const db = require("./models");

module.exports = {

  createOrUpdate: function (req, res) {
    const { type, payload } = req.body;
    switch (type) {
      case 'user':
        return db
          .find(type, payload)
          .then(found => {
            console.log(found);
            if (!found[0].length) return db.insert(type, payload);
            else return db.update(type, payload);
          })
          .then(results => {
            if (results[0].insertId > 0) {
              res.cookie('auth', 'true');
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
    return db
      .findSession(req.session_id)
      .then(results => {
        const user_id = results[0][0].user_id;
        return db.findUserBelongings(user_id, req.query.type);
      })
      .then(results => res.status(200).send(results[0]));
  },

  checkStatus: function (req, res) {
    return db
      .findSession(req.session_id)
      .then(results => {
        if (results[0].length) res.status(200).send(true);
        else {
          res.cookie('auth', 'false');
          res.status(200).send(false);
        }
      })
      .catch(err => {
        console.log('checkStatus error', err);
        res.sendStatus(400);
      });
  },

  login: function (req, res) {
    const { account, password: attempt } = req.body;
    let user_id;
    return db
      .matchUser(account, attempt)
      .then(results => {
        if (!results[0].length) res.sendStatus(400);
        user_id = results[0][0].id;
        return db.clearSessionByUserId(user_id);
      })
      .then(() => {
        res.cookie('auth', 'true')
        return db.createSession(req.session_id, user_id);
      })
      .then(res.sendStatus.bind(res, 201))
      .catch(err => res.status(400).send(err));
  },

  logout: function (req, res) {
    res.cookie('auth', 'false');
    return db.clearSession(req.session_id)
      .then(results => {
        if (!results[0].affectedRows) res.sendStatus(400);
        res.sendStatus(201);
      })
      .catch(err => res.status(400).send(err));
  }

}