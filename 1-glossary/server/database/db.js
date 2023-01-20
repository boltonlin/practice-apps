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

  // cases:
  // 1 - editing a term and its word and pos matches an existing entry
  //      then i want to combine the definitions and delete dupe entry
  // 2 - editing a term and changing its word / pos / definitions
  //      but it's the only one of its kind
  updateTerm: function (term) {
    let { _id, word, partOfSpeech, definitions } = term;
    _id = mongoose.Types.ObjectId(_id);

    return Term.findOneAndUpdate({ _id }, { word, partOfSpeech, definitions }).exec()
      .then(result => {
        // adding a word/pos that already exists
        if (!result) {
          return Term.findOneAndUpdate({ word, partOfSpeech },
            { $push: { definitions: { $each: [...definitions] } } }).exec();
        } else {
        // editing an existing word to match the word/pos of another
        // OR editing an existing word
          return Term.find({ word, partOfSpeech }).exec()
              .then((results) => {
                // there are two words with same word+pos
                if (results.length > 1) {
                  // update one of the terms and delete the other
                  let keepId = null;
                  for (let index in results) {
                    if (!results[index]._id.equals(_id)) {
                      // keep the id that wasn't provided
                      keepId = results[index]._id;
                    }
                  }
                  return Term.updateOne({ _id: keepId },
                    { $push: { definitions: { $each: [...definitions ] } } }).exec()
                      .then(() => {
                        return Term.deleteOne({ _id }).exec();
                      });
                } else {
                // there is only one word
                  return true;
                }
              });
        }
      });
    },

    // return Term.findOne({ word, partOfSpeech })
    //   .then((foundTerm) => {
    //     console.log('foundTerm id: ', foundTerm._id)
    //     console.log('toUpdate id: ', _id)

    //     if (foundTerm._id !== _id) {
    //       foundTerm.definitions = [...foundTerm.definitions, ...definitions];
    //       return foundTerm.save()
    //         .then(() => {
    //           return Term.deleteOne({ _id }).exec();
    //         });
    //     } else {
    //       if (word) foundTerm.word = word;
    //       if (partOfSpeech) foundTerm.partOfSpeech = partOfSpeech;
    //       for (let index in definitions) {
    //         foundTerm.definitions[index] = definitions[index];
    //       }
    //       if (definitions.length > foundTerm.definitions.length) {
    //         for (let i = foundTerm.definitions.length - 1; i < definitions.length; i++){
    //           foundTerm.definitions.push(definitions[i]);
    //         }
    //       }
    //       return foundTerm.save();
    //     }
    //   })

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