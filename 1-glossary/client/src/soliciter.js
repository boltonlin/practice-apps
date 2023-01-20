const axios = require('axios');

const baseEndpoint = 'http://localhost:3000/api/word';

module.exports = {
  save: function (term) {
    return axios({
      url: baseEndpoint,
      method: 'put',
      data: term
    });
  },

  get: function (term) {
    if (!term) {
      return axios({
        url: baseEndpoint,
        method: 'get'
      });
    }
  },

  changeDefinition: function () {

  },

  removeTerm: function () {

  },

  removeDefinition: function () {

  },
}