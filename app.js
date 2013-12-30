
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./server/routes');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('gpssiamonoi_coookie_secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./server/routes.js')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
