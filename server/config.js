var config = {};

config.site = {};
config.site.url = process.env.URL || 'http://localhost:3000/';

config.twitter = {};
config.twitter.consumer_key = '21sQGTwFubvAIrvfMeIZQ';
config.twitter.consumer_secret = 'QswEDhRYrwzWa3nLNfyqMZ0tg4kgPYK7Jvv16HlLemw';
//-----salem84
//config.twitter.default_access_token = '165020788-VZB63Y32MLwg2ujaWEuA35TNCtQMD8FuACGiLwir';
//config.twitter.default_access_token_secret = 'TZwyYbzfk81xm1y1IsTMYFuQUAdsxvd2QL4iyBcLX96Ba';
if(process.env.PRODUZIONE == 1)
{
    //-----movesharing
    config.twitter.default_access_token = '1470508477-J3TkybkI0GoslnQ0d9dQJ6coIjd4ExsDclMmhtj';
    config.twitter.default_access_token_secret = 'xYkiccRhpy71SyOSpHqjGvtItMgiiALAIkkWntWWFYb1K';
    config.twitter.hashTag = '#ilgpssiamonoi';
}
else
{
    //-----test__12
    config.twitter.default_access_token = '2268802591-mgD0xv3yAMETwCzu7tJDDlfBXZYbotclj49w8QU';
    config.twitter.default_access_token_secret = '1luhAOtJWhblI7XNN0SSsv4lIOKBenI8kyZFARnst1Cf8';
    config.twitter.hashTag = '#test';
}

config.twitter.callback_url = config.site.url + 'api/auth/twitter/callback';

config.sendgrid = {};
config.sendgrid.api_user = 'azure_b14271a11ccf7b2d3b45632111ec0371@azure.com';
config.sendgrid.api_key = 'w6dfvh8y';

config.db = {};
config.db.host = process.env.DB_HOST || 'localhost';
config.db.port = process.env.DB_PORT || 27017;
config.db.user = process.env.DB_USER;
config.db.password = process.env.DB_PASSWORD;

//DB Produzione
//config.db.host = 'ds030827.mongolab.com';
//config.db.port =30827;
//config.db.user = 'gpsuser';
//config.db.password = 'ilgpssiamonoi!';

config.db.database = 'ilgpssiamonoi';

config.logger = {};
config.logger.name = process.env.LOGGER_NAME || 'console'; 
config.logger.logentriesToken = 'bf5c544b-31cb-4d61-abf6-ddfd59a11241';

config.cookie_secret = process.env.COOKIE_SECRET || 'gpssiamonoi_coookie_secret';

config.roles = {};
config.roles.USER = 1;
config.roles.ADMIN = 2;


module.exports = config;