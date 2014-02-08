var config = require('../config.js'),
    mongoose = require('mongoose');


var options = {
  user: config.db.user,
  pass: config.db.password
}
mongoose.connect('mongodb://'+config.db.host + ':' + config.db.port + '/' + config.db.database, options);

// crea tabella utenti
var User = mongoose.model('User', {
    provider: String,
    oauthID: Number,
    token: String,
    tokenSecret: String,
    username: String,
    displayName: String,
    role: Number,
    created: Date
});

module.exports = User;