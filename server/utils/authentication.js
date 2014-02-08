var _ = require('underscore'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../utils/database.js'),
    log = require('../logger.js'),
    mongoose = require('mongoose'), //TODO da spostare nella classe database
    config = require('../config.js');

module.exports = {
    findOrCreateOauthUser: function (token, tokenSecret, profile, done) {
        
        User.findOne({ oauthID: profile.id }, function (err, user) {
            if (err) { log.err(err); }
            if (!err && user != null) {
                done(null, user);
            } else {
                var user = new User({
                    provider: profile.provider,
                    oauthID: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    token: token,
                    tokenSecret: tokenSecret,
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
        var oId = new mongoose.Types.ObjectId(id);
        //return _.clone(_.find(users, function (user) { return user.id === id }));
        User.findOne({ _id: oId }, function (err, dbUser) {
            if (err) { log.err(err); }
            if (!err && dbUser != null) {
                 var user = new User({
                    provider: dbUser.provider,
                    oauthID: dbUser.oauthID,
                    username: dbUser.username,
                    displayName: dbUser.displayName,
                    token: dbUser.token,
                    tokenSecret: dbUser.tokenSecret,
                    created: dbUser.created
                });

                done(null, user);
            }
            else {
                log.err('Trovato _id in sessione non esistente su DB');
                done(null, false);
            }
        })
    },
    //findByProviderId: function (provider, id) {
    //    return _.find(users, function (user) { return user[provider] === id; });
    //},

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

                //done(null, user);
            });
    },
    serializeUser: function (user, done) {
        done(null, user.id);
    },

    deserializeUser: function (id, done) {
        /*var user = module.exports.findById(id);

        if (user) { done(null, user); }
        else { done(null, false); }*/
        module.exports.findById(id, done);
    }
};