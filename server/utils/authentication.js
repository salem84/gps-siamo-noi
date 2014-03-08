var _ = require('underscore'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../utils/database.js'),
    log = require('../logger.js'),
    mongoose = require('mongoose'), //TODO da spostare nella classe database
    config = require('../config.js');



module.exports = {
    findOrCreateOauthUser: function (token, tokenSecret, profile, done) {
        //Verifico se già esiste l'utente su DB
        User.findOne({ oauthID: profile.id }, function (err, user) {
            if (err) { log.err(err); }
            if (!err && user != null) {
                //L'ho trovato, non faccio nulla
                done(null, user);
            } else {
                //E' la prima volta, allora creo il record su DB
                var user = new User({
                    provider: profile.provider,
                    oauthID: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    token: token,
                    tokenSecret: tokenSecret,
                    role: config.roles.USER,
                    created: Date.now()
                });
                user.save(function (err) {
                    if (err) {
                        log.err(err);
                    } else {
                        log.info("salvataggio utente...");
                        done(null, user);
                    };
                });
            };

            return user;
        })
    },

    findById: function (id, done) {
        //La chiave del record è un ObjectId
        var oId = new mongoose.Types.ObjectId(id);
        //Mi trovo il record su db
        User.findOne({ _id: oId }, function (err, dbUser) {
            if (err) { log.err(err); }
            if (!err && dbUser != null) {
                //Quando lo trovo mi creo l'oggetto da tenere in memoria 
                var user = new User({
                    provider: dbUser.provider,
                    oauthID: dbUser.oauthID,
                    username: dbUser.username,
                    displayName: dbUser.displayName,
                    token: dbUser.token,
                    tokenSecret: dbUser.tokenSecret,
                    role: dbUser.role,
                    created: dbUser.created
                });
                //Comunico il completamento
                done(null, user);
            }
            else {
                log.err('Trovato _id in sessione non esistente su DB');
                done(null, false);
            }
        })
    },

    twitterStrategy: function () {
        if (!config.twitter.consumer_key) throw new Error('Verificare Twitter Consumer Key');
        if (!config.twitter.consumer_secret) throw new Error('Verificare Twitter Consumer Secret');

        return new TwitterStrategy({
            consumerKey: config.twitter.consumer_key,
            consumerSecret: config.twitter.consumer_secret,
            callbackURL: config.twitter.callback_url
        },
            function (token, tokenSecret, profile, done) {
                var user = module.exports.findOrCreateOauthUser(token, tokenSecret, profile, done);
            });
    },
    serializeUser: function (user, done) {
        //Serializzo in sessione l'id dell'utente per recuperarlo successivamente
        done(null, user.id);
    },

    deserializeUser: function (id, done) {
        //Ho l'id in sessione e lo cerco su DB
        module.exports.findById(id, done);
    }
};