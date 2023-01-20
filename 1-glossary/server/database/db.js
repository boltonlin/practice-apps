const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
  .catch((err) => console.log('Error connecting'));

const termSchema = mongoose.Schema({
  word:         String,
  partOfSpeech: String,
  definitions:  [String],
});

const Term = mongoose.model('Term', termSchema);

module.exports = {
  saveTerm: function (term) {
    const { word, partOfSpeech, definitions } = term;
    return Term.findOne({ word, partOfSpeech }).exec()
      .then(found => {
        if (!found) return Term(term).save();
        else return this.updateTerm(term);
      })
      .catch(err => console.log(err));
  },

  retrieveTerm: function (query) {
    const { word, partOfSpeech } = query;
    if (!word) return Term.find({}).exec();
    else if (!partOfSpeech) return Term.find({ word }).exec();
    else return Term.findOne({ word, partOfSpeech }).exec();
  },

  // either changing the definitions or changing the word and pos
  updateTerm: function (term) {
    const { word, partOfSpeech, definitions } = term;
    const _id = mongoose.Types.ObjectId(term._id);
    return Term.findOne({ _id }).exec()
      .then(foundTerm => {
        if (!foundTerm) return false;
        else {
          if (word) foundTerm.word = word;
          if (partOfSpeech) foundTerm.partOfSpeech = partOfSpeech;
          for (let index in definitions) {
            foundTerm.definitions[index] = definitions[index];
          }
          if (definitions.length > foundTerm.definitions.length) {
            for (let i = foundTerm.definitions.length - 1; i < definitions.length; i++){
              foundTerm.definitions.push(definitions[i]);
            }
          }
          return foundTerm.save();
        }
      })
  },

  deleteTerm: function (term) {
    return Term.deleteOne(term);
  },

  deleteDefinition: function (term) {
    const { word, partOfSpeech, targetIndex } = term;
    return Term.findOne({ word, partOfSpeech }).exec()
      .then(foundTerm => {
        if (!foundTerm) return false;
        else {
          foundTerm.definitions.splice(targetIndex, 1)
          return foundTerm.save();
        }
      })
      .catch(err => console.log(err));
  }
};

module.exports.Term = Term;