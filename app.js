
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),
    MongoStore  = require('connect-mongo')(express),
    routes = require('./server/routes'),
    auth = require('./server/utils/authentication')
    log = require('./server/logger'),
    config = require('./server/config.js');

var app = express();

//var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode


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
// app.use(express.cookieSession(
//     {
//         secret: process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret'
//     }));

app.use(express.session({
  secret  : config.cookie_secret,
  cookie  : {
    maxAge  : 7 * 24 * 60 * 60 * 1000              // expire the session(-cookie) after # seconds
  },
  store   : new MongoStore({
    db: config.db.database
  })
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
passport.use(auth.twitterStrategy());
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

require('./server/routes.js')(app);


http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + app.get('port'));
});




