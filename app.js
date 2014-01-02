
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),
    routes = require('./server/routes'),
    User = require('./server/models/User');

var app = express();

var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
//app.use(express.session({
//     secret: process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret'
//}));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret'
    }));

//altrimenti non carica i file statici
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.use(passport.initialize());
app.use(passport.session());
passport.use(User.twitterStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);


var logentries = require('node-logentries');
var log = logentries.logger({
  token:'bf5c544b-31cb-4d61-abf6-ddfd59a11241'
});

log.info("Applicazione avviata");

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
