
/**
 * Module dependencies.
 */

var express = require('express'),
    //Necessari da upgrade da Express 3
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),


    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),

    routes = require('./server/routes'),
    auth = require('./server/utils/authentication'),
    log = require('./server/logger'),
    config = require('./server/config.js'),

    db = require('./server/utils/database.js'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);

var app = express();

//var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/client/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
//app.use(express.session({
//     secret: process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret'
//}));
// app.use(express.cookieSession(
//     {
//         secret: process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret'
//     }));

app.use(session({
    secret: config.cookie_secret,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // expire the session(-cookie) after # seconds
    },
    resave: true,
    saveUninitialized: true,
    //store   : new MongoStore({
    //  host: config.db.host,
    //  db: config.db.database,
    //  port: config.db.port,
    //  username: config.db.user,
    //  password: config.db.password
    //})
    //store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//altrimenti non carica i file statici
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.twitterStrategy());
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

require('./server/routes.js')(app);


app.listen(app.get('port'), function(){
  log.info('Express server listening on port ' + app.get('port'));
});





