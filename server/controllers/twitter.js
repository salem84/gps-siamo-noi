﻿var Twit = require('twit');
var config = require('../config');


function getStringNewPostTemplate() {
    return '#test $DIREZIONE$ - $FERMATA$ @$ORA$';
}

function parseTwitterDate(text) {
	return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
}

function getValidTwitterScreenNames() {
	return ['infoatac', 'disinfoatac', 'romalido', 'voglioil19'];
}

function isValidTwitter(screenName) {
	screenName = screenName.toLowerCase();
	var validScreenNames = getValidTwitterScreenNames();

	if(validScreenNames.indexOf(screenName) == -1)
		return false;
	else
		return true;
}

function parseTweet(t) {
    var tweet = {
                id: t.id,
                data: parseTwitterDate(t.created_at),
                user: {
                    image: t.user.profile_image_url,
                    screenName: t.user.screen_name,
                    displayName: t.user.name
                },
                
                testo: t.text, //attenzione c'è anche l'utente
                // user: {
	  		// 	name: r.user.name,
	  		// 	img: r.user.profile_image_url
	  		// }
            };
    return tweet;
}

function createTwitterWrapper(isAuthenticated, user) {
    //Se non sono loggato o sto inviando con l'account associato all'app
    if (isAuthenticated) {
        var T = new Twit({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token: user.default_access_token,
            access_token_secret: user.default_access_token_secret
        });
       
        return T;
    } else {
         var T = new Twit({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token: config.twitter.default_access_token,
            access_token_secret: config.twitter.default_access_token_secret
        });
        
        return T;
    }
}

function createStandardMessage(req) {
    var msg = getStringNewPostTemplate();

    //msg = msg.replace("##LINEA##", req.body.selectedLinea);
    if (req.body.selectedDirezione) {
        msg = msg.replace("$DIREZIONE$", req.body.selectedDirezione);
    }
    if (req.body.selectedFermata) {
        msg = msg.replace("$FERMATA$", req.body.selectedFermata);
    }

    var ora = (new Date()).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    msg = msg.replace("$ORA$", ora);

    return msg;
}


// --------------------------- EXPORT


module.exports = {
    getTweets: function(req, res) {

        var pageSize = 10;
        var screenName = req.params.screenName;

        var maxId;
        if (req.query.maxId) {
            maxId = req.query.maxId;
        }

        if (!isValidTwitter(screenName)) {
            res.send(400);
        }

        var T = createTwitterWrapper(true);
        T.get('statuses/user_timeline', { screen_name: screenName, count: pageSize, max_id: maxId }, function(err, reply) {
            var array = [];
            for (i in reply) {
                var tweet;
                var r = reply[i];
                //E' un retweet
                if (r.retweeted_status) {
                    tweet = parseTweet(r.retweeted_status);
                } else {
                    tweet = parseTweet(r);
                }


                array.push(tweet);
            }
            res.json(array);
        });
    },

    getProfile: function(req, res) {
        var screenName = req.params.screenName;

        if (!isValidTwitter(screenName)) {
            res.send(400);
        }

        var T = createTwitterWrapper(true);
        T.get('users/lookup', { screen_name: screenName }, function(err, reply) {
            res.json(reply);
        });
    },

    getAllProfiles: function(req, res) {
        var screenNames = getValidTwitterScreenNames();
        var screenNamesCommaSeparated = screenNames.join(",");
        var T = createTwitterWrapper(true);
        T.get('users/lookup', { screen_name: screenNamesCommaSeparated }, function(err, reply) {
            var array = [];
            for (i in reply) {
                var r = reply[i];
                var profiles = {
                    id: r.id,
                    name: r.name,
                    screenName: r.screen_name,
                    image: r.profile_image_url,
                    bg_color: '#' + r.profile_background_color,
                    fg_color: '#' + r.profile_link_color
                };
                array.push(profiles);
            }
            res.json(array);
        });
    },

    sendTweet: function(req, res) {
        var isAuthenticated;
        if (req.body.isAuthenticated && req.user) {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }

        var msg;
        var T = createTwitterWrapper(isAuthenticated, req.user);
        if (!isAuthenticated) {
            
            msg = createStandardMessage(req);

        } else {    
            msg = req.body.messaggio;
        }
        
        //TODO se anche quello standard supera la lunghezza di 140 caratteri?
        if (msg.length > 140) {
            msg = createStandardMessage(req);
        }


        //res.send(msg);
        T.post('statuses/update', { status: msg }, function(err, reply) {
            if (err)
                res.send(500);
            else
                res.send(200);
        });


    },

    getTemplateTweet: function(req, res) {
        var result = {
            newPost: getStringNewPostTemplate()
        };
        res.json(result);
    }
};

