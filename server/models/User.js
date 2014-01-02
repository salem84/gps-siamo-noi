var _ = require('underscore'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config.js');

var users = [{
    id: 1,
    username: "user",
    password: "123",
    //role: userRoles.user
}];

module.exports = {
    findOrCreateOauthUser: function(profile) {
        var user = module.exports.findByProviderId(profile.provider, profile.id);
        if (!user) {
            user = {
                id: _.max(users, function(user) { return user.id; }).id + 1,
                username: profile.username,
                displayName: profile.displayName,
                //role: userRoles.user,
                provider: profile.provider
            };
            user[profile.provider] = profile.id;
            users.push(user);
        }

        return user;
    },
    
    findById: function(id) {
        return _.clone(_.find(users, function(user) { return user.id === id }));
    },
    findByProviderId: function(provider, id) {
        return _.find(users, function(user) { return user[provider] === id; });
    },

    twitterStrategy: function() {
        if (!config.twitter.consumer_key) throw new Error('Verificare Twitter Consumer Key');
        if (!config.twitter.consumer_secret) throw new Error('Verificare Twitter Consumer Secret');

        return new TwitterStrategy({
                consumerKey: config.twitter.consumer_key,
                consumerSecret: config.twitter.consumer_secret,
                callbackURL: config.twitter.callback_url
            },
            function(token, tokenSecret, profile, done) {
                var user = module.exports.findOrCreateOauthUser(profile);
                user.default_access_token = token;
                user.default_access_token_secret = tokenSecret;
                done(null, user);
            });
    },
    serializeUser: function(user, done) {
        done(null, user.id);
    },

    deserializeUser: function(id, done) {
        var user = module.exports.findById(id);

        if(user)    { done(null, user); }
        else        { done(null, false); }
    }
};