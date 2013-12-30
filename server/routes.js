var _ = require('underscore'),
    LineeCtrl = require('./controllers/linee.js'),
    TwitterCtrl = require('./controllers/twitter.js'),
    AuthCtrl = require('./controllers/auth.js');

var routes = [
    {
        path: '/test/:id',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            if (req.params.id == "1")
        res.send(200);
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
        path: '/auth/twitter',
        httpMethod: 'GET',
        middleware: [AuthCtrl.twitterAuth]
    },
    {
        path: '/auth/twitter/get_userinfo',
        httpMethod: 'GET',
        middleware: [AuthCtrl.getUserInfo]
    },
    {
        path: '/auth/twitter/callback',
        httpMethod: 'GET',
        middleware: [AuthCtrl.twitterAuthCallback]
    },


    // Tutte le altre richieste saranno gestite da AngularJS client-side routing
    {
        path: '/',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            //var role = userRoles.public, username = '';
            //if(req.user) {
            //    role = req.user.role;
            //    username = req.user.username;
            //}
            //res.cookie('user', JSON.stringify({
            //    'username': username,
            //    'role': role
            //}));
            res.render('index', { title: 'Gps siamo noi' });
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        //route.middleware.unshift(ensureAuthorized);
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