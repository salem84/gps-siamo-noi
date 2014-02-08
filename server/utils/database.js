var config = require('../config.js'),
    mongoose = require('mongoose');


mongoose.connect('mongodb://'+config.db.host + '/' + config.db.database);

// crea tabella utenti
var User = mongoose.model('User', {
    provider: String,
    oauthID: String,//Number,
    token: String,
    tokenSecret: String,
    username: String,
    displayName: String,
    role: String,
    created: Date
});

module.exports = User;