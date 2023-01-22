const mysql = require("mysql2");
const Promise = require("bluebird");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    db.queryAsync(`
      CREATE DATABASE IF NOT EXISTS checkout;
      USE checkout;
      CREATE TABLE IF NOT EXISTS user (
        id INT NOT NULL AUTO_INCREMENT,
        account VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id, account)
      );
      CREATE TABLE IF NOT EXISTS session (
        id VARCHAR(255) NOT NULL,
        user_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id)
      );
      CREATE TABLE IF NOT EXISTS address (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        type VARCHAR(255),
        address1 VARCHAR(255),
        address2 VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        zipcode VARCHAR(255),
        phone VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id)
      );
      CREATE TABLE IF NOT EXISTS payment (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        creditcard VARCHAR(255),
        expirydate DATE,
        cvv VARCHAR(255),
        zipcode VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id)
      );
    `)
  )
  .catch((err) => console.log(err));

const KEYS = {
  'user': 'account',
  'session': 'id',
  'address': 'id',
  'payment': 'id'
};

const BELONGINGS = {
  'user': 'email',
  'address': 'address1, address2, city, state, zipcode, phone',
  'payment': 'creditcard, expirydate, cvv, zipcode',
};

const _parametize = function (arr, wantWrap) {
  let result = arr.reduce(
    (param, value, i) => {
      let str = '';
      if (!wantWrap) str = `${value}`;
      else str = `'${value}'`;
      if (i < (arr.length - 1))
        str += ','
      return param + str;
  }, '');
  return result;
};

const _generateAssignment = function(obj, ignore) {
  let assignment = Object.keys(obj).reduce(
    (acc, key, index) => {
      let str = '';
      if (index > 0 && acc !== '')
        str += ', '
      if (!Number.isInteger(obj[key]))
        str += `${key} = '${obj[key]}'`;
      else
        str += `${key} = ${obj[key]}`;
      if (key !== ignore) return acc + str;
      else return acc;
    }, '')
  return assignment;
};

Object.assign(db, {
  find: function (type, payload) {
    let select = type === 'user'? 'account, email' : '*';
    let sql = `SELECT ${select} FROM ?? WHERE ??=?`;
    var inserts = [type, KEYS[type], payload[KEYS[type]]];
    console.log(sql);
    console.log(KEYS[type]);
    console.log(payload[KEYS[type]]);
    return db.queryAsync(sql, inserts);
  },

  findUserBelongings: function (user_id, type) {
    let select = BELONGINGS[type];
    let filter = type === 'user' ? `id=${user_id}` : `user_id=${user_id}`
    let sql = `SELECT ${select} FROM ${type} WHERE (${filter})`;
    return db.queryAsync(sql);
  },

  insert: function (type, payload) {
    let keys = _parametize(Object.keys(payload), false);
    let values = _parametize(Object.values(payload), true);
    let sql = `INSERT INTO ${type} (${keys}) VALUES (${values})`;
    return db.queryAsync(sql);
  },

  update: function (type, payload) {
    let assignment = _generateAssignment(payload, KEYS[type])
    let filter = `'${payload[KEYS[type]]}'`;
    if (KEYS[type] === 'user_id')
      filter = `${payload[KEYS[type]]}`;
    let sql = `UPDATE ${type} SET ${assignment} WHERE ${KEYS[type]} = ${filter}`
    return db.queryAsync(sql);
  },

  createSession: function (session_id, user_id) {
    let sql = `INSERT INTO session (id, user_id) VALUES ('${session_id}', ${user_id})`
    return db.queryAsync(sql);
  },

  findSession: function (session_id) {
    let sql = `SELECT user_id FROM session WHERE id='${session_id}'`;
    return db.queryAsync(sql);
  },

  clearSession: function (session_id) {
    let sql = `DELETE FROM session WHERE id='${session_id}'`;
    return db.queryAsync(sql);
  },

  clearSessionByUserId: function (user_id) {
    let sql = `DELETE FROM session WHERE user_id=${user_id}`;
    return db.queryAsync(sql);
  },

  matchUser: function (account, attempt) {
    let sql = `SELECT * FROM user WHERE (account='${account}' && password='${attempt}')`;
    return db.queryAsync(sql);
  }
})

module.exports = db;
