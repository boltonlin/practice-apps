const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
  .catch((err) => console.log('Error connecting'));

// automatic _id, homonyms exist
const termSchema = mongoose.Schema({
  word:         String,
  definition:   String,
});

const Term = mongoose.model('Term', termSchema);

module.exports = {

  saveTerm: function (term) {

  },

  retrieveTerm: function (word) {

  },

  updateTerm: function (word, newDefinition) {

  },

};