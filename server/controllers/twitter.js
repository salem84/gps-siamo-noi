var Twit = require('twit'),
    moment = require('moment-timezone'),
    config = require('../config'),
    log = require('../logger'),
    lineeCtrl = require('./linee.js');


function getStringNewPostTemplate() {
    return config.twitter.hashTag + ' $DIREZIONE$ - $FERMATA$ alle $ORA$';
}

function parseTwitterDate(text) {
    return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
}

function getValidTwitterScreenNames() {
    return ['infoatac', 'iltrenoromalido', 'treninogiallo', 'disinfoatac', 'romalido', 'voglioil19', 'movesharing'];
}

function isValidTwitter(screenName) {
    screenName = screenName.toLowerCase();
    var validScreenNames = getValidTwitterScreenNames();

    if (validScreenNames.indexOf(screenName) == -1)
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
        log.info('Creazione User Context - AT: ' + user.default_access_token + ' DAT: ' + user.default_access_token_secret);
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

    var ora = moment().tz('Europe/Rome').format('HH:mm');
    msg = msg.replace("$ORA$", ora);

    return msg;

}


    // --------------------------- EXPORT


module.exports = {
    getTweets: function (req, res) {

        var pageSize = 10;
        var screenName = req.params.screenName;

        log.info('getTweets '+ screenName);

        var maxId;
        if (req.query.maxId) {
            maxId = req.query.maxId;
        }

        if (!isValidTwitter(screenName)) {
            res.send(400);
            log.err('Richiesto account non valido');
        }

        var T = createTwitterWrapper(false);
        T.get('statuses/user_timeline', { screen_name: screenName, count: pageSize, max_id: maxId }, function (err, reply) {
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

            log.info('Invio tweets');

            res.json(array);
        });
    },

    getProfile: function (req, res) {
        var screenName = req.params.screenName;

        log.info('getProfile '+ screenName);

        if (!isValidTwitter(screenName)) {
            res.send(400);
            log.err('Richiesto account non valido');
        }

        var T = createTwitterWrapper(true);
        T.get('users/lookup', { screen_name: screenName }, function (err, reply) {
            res.json(reply);
        });
    },

    //Elenco profili twitter
    getAllProfiles: function (req, res) {
        log.info('getAllProfiles request');

        //Leggo tutti i nomi
        var screenNames = getValidTwitterScreenNames();
        var screenNamesCommaSeparated = screenNames.join(",");
        //Utilizzo l'account di default
        var T = createTwitterWrapper(false);
        //Mi scarico tutte le info
        T.get('users/lookup', { screen_name: screenNamesCommaSeparated }, function (err, replies) {
            var array = [];
            for (i in replies) {
                var r = replies[i];
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

            log.info('Invio profili');

            res.json(array);
        });
    },

    //Invio segnalazione
    sendTweet: function (req, res) {
        log.info('Tentativo invio tweet');
        var isAuthenticated;

        var resVerifica = lineeCtrl.verificaDatiLinea(req.body.selectedLinea, req.body.selectedDirezione, req.body.selectedFermata);
        if (resVerifica == false) {
            res.send(500);
            log.err('Verifica fallita per ' + JSON.stringify(req.body));
            return;
        };


        if (req.body.isAuthenticated && req.user) {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }
        
        log.info('Contesto autenticato: '+isAuthenticated);

        var msg;
        var T = createTwitterWrapper(isAuthenticated, req.user);
        if (!isAuthenticated) {
            msg = createStandardMessage(req);

        } else {
            msg = req.body.messaggio;
        }

        log.info('Invio messaggio ' + msg);
        //TODO se anche quello standard supera la lunghezza di 140 caratteri?
        if (msg.length > 140) {
            msg = createStandardMessage(req);
        }

        //res.send(msg);
        T.post('statuses/update', { status: msg }, function (err, reply) {
            if (err) {
                res.send(500);
                log.err('Impossibile inviare tweet: ' + err);
            }
            else {
                log.info('Tweet inviato');

                var idTweet = reply.id_str;

                //In caso lo sta inviando dal proprio profilo, devo fare un retweet
                if (isAuthenticated) {
                    log.info('Invio retweet');

                    var Tr = createTwitterWrapper(false, null);
                    Tr.post('statuses/retweet/' + idTweet, function (err, reply) {
                        if (err) {
                            res.send(500);
                            log.err('Errore nel retweet ' + err);
                        }
                        else {
                            res.send(200);
                            log.info('Retweet inviato correttamente');
                        }
                    });
                }

                res.send(200);
            }
        });



    },

    getTemplateTweet: function (req, res) {
        log.info('getTemplateTweet request');

        var result = {
            newPost: getStringNewPostTemplate()
        };
        res.json(result);
    }
};


