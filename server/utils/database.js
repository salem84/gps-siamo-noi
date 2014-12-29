var config = require('../config.js'),
    log = require('../logger.js'),
    mongoose = require('mongoose');

try {
    var s_conn = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database;
    log.info('init database ' + s_conn);

    var options = {
        user: config.db.user,
        pass: config.db.password,
        replset: {
            socketOptions: {
                connectTimeoutMS: config.db.timeout,
                socketTimeoutMS: config.db.timeout,
                keepAlive: 1
            }
        },
        server: {
            socketOptions: {
                keepAlive: 1
            }
        },
        auto_reconnect: true
    }
    mongoose.connect(s_conn, options);

    // crea tabella utenti
    var UserModel = mongoose.model('User', {
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
    var SegnalazioneModel = mongoose.model('Segnalazione', {
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

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

} catch (e) {
    log.err('errore init database ' + e);
}

module.exports = {
    User : UserModel,
    Segnalazione : SegnalazioneModel
};
