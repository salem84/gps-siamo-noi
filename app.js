
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
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
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.list);

// --- ATAC
app.get('/linee', routes.linee.elencoLinee);
app.get('/linee/:id', routes.linee.dettagliLinea);
app.post('/segnalazioni/', routes.aggiungiSegnalazione);

// --- TWITTER
//app.get('/twitterCheck', routes.twitterCheck);
app.get('/twitter/lookup', routes.twitter.getAllProfiles);
app.get('/twitter/:screenName', routes.twitter.getProfile);
app.get('/twitter/:screenName/tweets', routes.twitter.getTweets);
app.post('/twitter', routes.twitter.sendTweet);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
