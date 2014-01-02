var config = {};

config.site = {};
config.site.url = process.env.URL || 'http://192.168.13.252:3000/';

config.twitter = {};
config.twitter.consumer_key = '21sQGTwFubvAIrvfMeIZQ';
config.twitter.consumer_secret = 'QswEDhRYrwzWa3nLNfyqMZ0tg4kgPYK7Jvv16HlLemw';
config.twitter.default_access_token = '165020788-VZB63Y32MLwg2ujaWEuA35TNCtQMD8FuACGiLwir';
config.twitter.default_access_token_secret = 'TZwyYbzfk81xm1y1IsTMYFuQUAdsxvd2QL4iyBcLX96Ba';
config.twitter.callback_url = config.site.url + 'api/auth/twitter/callback';

config.sendgrid = {};
config.sendgrid.api_user = 'azure_b14271a11ccf7b2d3b45632111ec0371@azure.com';
config.sendgrid.api_key = 'w6dfvh8y';

module.exports = config;