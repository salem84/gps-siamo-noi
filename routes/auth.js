exports.twitterAuth = function(req, res) {
    var oa = getOAuth();
    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		if (error) {
			console.log(error);
		    res.send(401);
		}
		else {
			req.session.oauth = {};
			req.session.oauth.token = oauth_token;
			console.log('oauth.token: ' + req.session.oauth.token);
			req.session.oauth.token_secret = oauth_token_secret;
			console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
		    res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
		}
	});

};

exports.twitterAuthCallback = function(req, res) {
    var urlCallbackClient = 'http://192.168.13.252:3000/#/auth/twitter/callback/';
    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth = req.session.oauth;
        var oa = getOAuth();
        oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier,
            function(error, oauth_access_token, oauth_access_token_secret, results) {
                if (error) {
                    console.log(error);
                    res.redirect(urlCallbackClient + 'error');
                } else {
                    req.session.oauth.access_token = oauth_access_token;
                    req.session.oauth.access_token_secret = oauth_access_token_secret;
                    console.log(results);
                    res.redirect(urlCallbackClient + 'success');
                }
            }
        );
    } else {
        //next(new Error("you're not supposed to be here."));
        console.log("you're not supposed to be here.");
        res.redirect(urlCallbackClient + 'error');
    }
};

exports.getUserInfo = function(req, res) {
    var Twit = require('twit');
    var T = new Twit({
        consumer_key: '21sQGTwFubvAIrvfMeIZQ',
        consumer_secret: 'QswEDhRYrwzWa3nLNfyqMZ0tg4kgPYK7Jvv16HlLemw',
        access_token: req.session.oauth.access_token,
        access_token_secret: req.session.oauth.access_token_secret
        //access_token: '165020788-VZB63Y32MLwg2ujaWEuA35TNCtQMD8FuACGiLwir',
        //access_token_secret: 'TZwyYbzfk81xm1y1IsTMYFuQUAdsxvd2QL4iyBcLX96Ba'
    });

    T.get('account/verify_credentials', function(err, reply) {
        res.json(reply);
    });

};


function getOAuth() {
    var OAuth= require('oauth').OAuth;
    var oa = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        "21sQGTwFubvAIrvfMeIZQ",
        "QswEDhRYrwzWa3nLNfyqMZ0tg4kgPYK7Jvv16HlLemw",
        "1.0",
        "http://gpssiamonoi.azurewebsites.net/auth/twitter/callback",
        "HMAC-SHA1"
    );
    return oa;
}