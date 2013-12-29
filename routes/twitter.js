﻿var T = require('../utils/twitter_config');

exports.twitterCheck = function (req, res) {
    // twitter.verifyCredentials(function (error, data) {
    //     res.send("Hello, " + data.name + ".  I am in your twitters.");
    // });
};


exports.getTweets = function(req, res) {

    // var stream;
    // var testTweetCount = 0;
    // var phrase = 'atac';
    // twitter.verifyCredentials(function (error, data) {
    //     if (error) {
    //         res.send("Error connecting to Twitter: " + error);
    //     }
    //     stream = twitter.stream('statuses/filter', {
    //         'track': phrase
    //     }, function (stream) {
    //         res.send("Monitoring Twitter for \'" + phrase 
    //             + "\'...  Logging Twitter traffic.");
    //         stream.on('data', function (data) {
    //             testTweetCount++;
    //             // Update the console every 50 analyzed tweets
    //             //if (testTweetCount % 50 === 0) {
    //                 console.log("Tweet #" + testTweetCount + ":  " + data.text);
    //             //}
    //         });
    //     });
    // });

    // var stream = T.stream('statuses/user_timeline', { screen_name: 'twitterapi' })
    // res.send("Monitoring Twitter for ...  Logging Twitter traffic.");
    // stream.on('tweet', function (tweet) {
    //   console.log(tweet)
    // });

    // T.get('search/tweets', { q: '#atac', count: 10 }, function(err, reply) {
    //   res.json(reply)
    // })
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
};


exports.getProfile = function(req, res) {
    var screenName = req.params.screenName;

    if (!isValidTwitter(screenName)) {
        res.send(400);
    }

    T.get('users/lookup', { screen_name: screenName }, function(err, reply) {
        res.json(reply);
    });
};

exports.getAllProfiles = function(req, res) {
    var screenNames = getValidTwitterScreenNames();
    var screenNamesCommaSeparated = screenNames.join(",");
    T.get('users/lookup', { screen_name: screenNamesCommaSeparated }, function(err, reply) {
        var array = [];
        for (i in reply) {
            var r = reply[i];
            var profiles = {
                id: r.id,
                name : r.name,
                screenName : r.screen_name,
                image: r.profile_image_url,
                bg_color: '#'+r.profile_background_color,
                fg_color: '#'+r.profile_link_color
            };
            array.push(profiles);
        }
        res.json(array);
    });
};

exports.sendTweet = function(req, res) {
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


};

exports.getTemplateTweet = function(req, res) {
    var result = {
        newPost : getStringNewPostTemplate()
        
    };
    res.json(result);
};

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