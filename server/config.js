var config = {};

config.site = {};
config.site.url = process.env.URL || 'http://192.168.13.252:3000/';

config.twitter = {};
config.twitter.consumer_key = '21sQGTwFubvAIrvfMeIZQ';
config.twitter.consumer_secret = 'QswEDhRYrwzWa3nLNfyqMZ0tg4kgPYK7Jvv16HlLemw';
config.twitter.default_access_token = '165020788-VZB63Y32MLwg2ujaWEuA35TNCtQMD8FuACGiLwir';
config.twitter.default_access_token_secret = 'TZwyYbzfk81xm1y1IsTMYFuQUAdsxvd2QL4iyBcLX96Ba';
config.twitter.callback_url = config.site.url + 'api/auth/twitter/callback';

module.exports = config;