var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var profileModel = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: String
  },
  endereco: {
    type: String
  },
  dataNascimento: {
    type: Date
  },
  ready: {type: Boolean, default: false}
});

module.exports = mongoose.model('Profile', profileModel);
