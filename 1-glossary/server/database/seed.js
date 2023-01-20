const Term = require("./db").Term;

/**
    {
      "word": ,
      "partOfSpeech": ,
      "definitions": [

      ]
    }
 */

const seedTerms = [
  {
    "word": "example",
    "partOfSpeech": "noun",
    "definitions": [
      "one that serves as a pattern to be imitated or not to be imitated",
      "a punishment inflicted on someone as a warning to others",
      "one that is representative of all of a group or type"
    ]
  },
  {
    "word": "example",
    "partOfSpeech": "verb",
    "definitions": [
      "to serve as an example of",
      "to be or set an example to"
    ]
  },
  {
    "word": "sitzmark",
    "partOfSpeech": "noun",
    "definitions": [
      "a sunken area in the snow marking a backward fall of a skier."
    ]
  },
  {
    "word": "woke",
    "partOfSpeech": "adjective",
    "definitions": [
      "aware of and actively attentive to important societal facts and issues (especially issues of racial and social justice)",
      "politically liberal (as in matters of racial and social justice) especially in a way that is considered unreasonable or extreme"
    ]
  },
  {
    "word": "propaganda",
    "partOfSpeech": "noun",
    "definitions": [
      "capitalized : a congregation of the Roman curia having jurisdiction over missionary territories and related institutions",
      "the spreading of ideas, information, or rumor for the purpose of helping or injuring an institution, a cause, or a person",
      "ideas, facts, or allegations spread deliberately to further one's cause or to damage an opposing cause | also : a public action having such an effect"
    ]
  },
  {
    "word": "apothecary",
    "partOfSpeech": "noun",
    "definitions": [
      "one who prepares and sells drugs or compounds for medicinal purposes",
      "PHARMACY"
    ]
  },
]

module.exports = {
  seedDb: function () {
    return Term.insertMany(seedTerms);
  },
  deleteSeedTerms: function () {
    return Term.deleteMany({ word: /SEED_/ });
  }
}