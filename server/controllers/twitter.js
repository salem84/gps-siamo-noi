var Twit = require('twit');
var config = require('../config');
var T = new Twit({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token: config.twitter.default_access_token,
    access_token_secret: config.twitter.default_access_token_secret
});

function getStringNewPostTemplate() {
    return '#test ##LINEA## --> ##DIREZIONE## @ ##FERMATA##';
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

        T.get('users/lookup', { screen_name: screenName }, function(err, reply) {
            res.json(reply);
        });
    },    

    getAllProfiles: function(req, res) {
        var screenNames = getValidTwitterScreenNames();
        var screenNamesCommaSeparated = screenNames.join(",");
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
        var isStandard;
        if (req.body.isStandard == false) {
            isStandard = false;
        } else {
            isStandard = true;
        }

        var msg;
        if (isStandard) {
            msg = getStringNewPostTemplate();

            msg = msg.replace("##LINEA##", req.body.selectedLinea);
            if (req.body.selectedDirezione) {
                msg = msg.replace("##DIREZIONE##", req.body.selectedDirezione);
            }
            if (req.body.selectedFermata) {
                msg = msg.replace("##FERMATA##", req.body.selectedFermata);
            }

        } else {
            msg = req.body.note;
        }


        res.send(msg);
        //T.post('statuses/update', { status: msg }, function(err, reply) {
        //    if (err)
        //        res.send(500);
        //    else
        //        res.send(200);
        //});


    },

    getTemplateTweet: function(req, res) {
        var result = {
            newPost: getStringNewPostTemplate()        
        };
        res.json(result);
    }
};


