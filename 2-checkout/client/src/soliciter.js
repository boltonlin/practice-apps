const axios = require('axios');

module.exports = {

  get: function (type) {

  },

  put: function (type, data) {

  },

  login: function (info) {
    return axios({
      url: '/api/login',
      method: 'post',
      data: info
    })
  },

  logout: function () {
    return axios({
      url: '/api/logout',
      method: 'get'
    });
  },

  signup: function(info) {
    return axios({
      url: '/api/forms',
      method: 'put',
      data: { type: 'user', payload: info }
    })
  },

  checkStatus: function () {
    return axios({
      url: '/api/status',
      method: 'get'
    })
      .then(results => results.data);
  }

};