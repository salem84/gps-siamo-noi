var _ = require('underscore'),
    passport = require('passport'),
    AuthCtrl = require('./controllers/auth.js'),
    LineeCtrl = require('./controllers/linee.js'),
    TwitterCtrl = require('./controllers/twitter.js'),
    AssistenzaCtrl = require('./controllers/assistenza.js');

var routes = [
    {
        path: '/test/:id',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            if (req.params.id == "1") {
                //var ora = ().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
                res.send(new Date('Europe/Amsterdam'));
            }
            else
                res.send(500);
        }]
    },    
    // ATAC
    {
        path: '/linee',
        httpMethod: 'GET',
        middleware: [LineeCtrl.elencoLinee]
    },
    {
        path: '/linee/:id',
        httpMethod: 'GET',
        middleware: [LineeCtrl.dettagliLinea]
    },    
    // TWITTER
    {
        path: '/twitter/lookup',
        httpMethod: 'GET',
        middleware: [TwitterCtrl.getAllProfiles]
    },
    {
        path: '/twitter/template',
        httpMethod: 'GET',
        middleware: [TwitterCtrl.getTemplateTweet]
    },
    {
        path: '/twitter/profili/:screenName',
        httpMethod: 'GET',
        middleware: [TwitterCtrl.getProfile]
    },
    {
        path: '/twitter/profili/:screenName/tweets',
        httpMethod: 'GET',
        middleware: [TwitterCtrl.getTweets]
    },
    {
        path: '/twitter',
        httpMethod: 'POST',
        middleware: [TwitterCtrl.sendTweet]
    },    
    // AUTH
    {
        path: '/auth/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },
    {
        path: '/auth/twitter',
        httpMethod: 'GET',
        middleware: [passport.authenticate('twitter')]
    },
    {
        path: '/auth/twitter/callback',
        httpMethod: 'GET',
        middleware: [passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        })]
    },    
    {
        path: '/auth/twitter/get_userinfo',
        httpMethod: 'GET',
        middleware: [AuthCtrl.getUserInfo]
    },    
    {
        path: '/assistenza',
        httpMethod: 'POST',
        middleware: [AssistenzaCtrl.inviaSegnalazione]
    },
    
    // Tutte le altre richieste saranno gestite da AngularJS client-side routing
    {
        path: '/*',
        skipApi: true,
        httpMethod: 'GET',
        middleware: [function(req, res) {
            //var role = userRoles.public, username = '';
            var username = '';
            var displayName = '';
            if (req.user) {
                //    role = req.user.role;
                username = req.user.username;
                displayName = req.user.displayName;
            }

            res.cookie('user', JSON.stringify({
                'username': username,
                'displayName': displayName,
                'role': ''
            }));
            res.render('index', { title: 'Gps siamo noi' });
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        //route.middleware.unshift(ensureAuthorized);
        
        if (!route.skipApi)
            route.path = '/api' + route.path;
        
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}