var config = require('../config.js'),
    log = require('../logger.js'),
    mongoose = require('mongoose');

try {
    var s_conn = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database;
    log.info('init database ' + s_conn);

    var options = {
        user: config.db.user,
        pass: config.db.password
    }
    mongoose.connect(s_conn, options);

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

    // crea tabella segnalazioni
    var Segnalazione = mongoose.model('Segnalazione', {
        linea: String,
        tipologia: String,
        descrizione: String,
        username: String,
        created: Date
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    });

} catch (e) {
    log.err('errore init database ' + e);
}

module.exports = User;
module.exports = Segnalazione;