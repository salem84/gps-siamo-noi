
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('gpssiamonoi_coookie_secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/test/:id', function(req, res) {
    if (req.params.id == "1")
        res.send(200);
    else
        res.send(500);
});

// --- ATAC
app.get('/linee', routes.linee.elencoLinee);
app.get('/linee/:id', routes.linee.dettagliLinea);
//app.post('/segnalazioni/', routes.aggiungiSegnalazione);

// --- TWITTER
//app.get('/twitterCheck', routes.twitterCheck);
app.get('/twitter/lookup', routes.twitter.getAllProfiles);
app.get('/twitter/profili/:screenName', routes.twitter.getProfile);
app.get('/twitter/profili/:screenName/tweets', routes.twitter.getTweets);
app.post('/twitter', routes.twitter.sendTweet);

app.get('/twitter/template', routes.twitter.getTemplateTweet);

// --- AUTHENTICATION
app.get('/auth/twitter', routes.auth.twitterAuth);
app.get('/auth/twitter/get_userinfo', routes.auth.getUserInfo);
app.get('/auth/twitter/callback', routes.auth.twitterAuthCallback);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
