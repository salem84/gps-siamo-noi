var config = require('../config.js'),
    log = require('../logger.js'),
    mongoose = require('mongoose');

try {

    var Models = { };

    function startConnection() {
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
        Models.User = mongoose.model('User', {
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
        Models.Segnalazione = mongoose.model('Segnalazione', {
            linea: String,
            tipologia: String,
            descrizione: String,
            username: String,
            data: Date
        });
    }

    startConnection();
    

    var db = mongoose.connection;
    
    db.on('error', function (error) {
        log.err('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        log.info('MongoDB connected!');
    });
    db.once('open', function () {
        log.info('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        log.info('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        log.info('MongoDB disconnected!');
        startConnection();
    });

    process.on('SIGINT', function () {
        db.close(function () {
            log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    });
    

} catch (e) {
    log.err('errore init database ' + e);
}

//module.exports = {
//    User : UserModel,
//    Segnalazione : SegnalazioneModel
//};
module.exports = Models;