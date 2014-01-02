var config = require('./config'),
    logentries = require('node-logentries'),
    log;

if ('console' == config.logger.name) {
    log = {        
      info: function(msg) {
          console.log(msg);
      }  
    };
} 
else {
    log = logentries.logger({
        token: config.logger.logentriesToken
    });
}

module.exports = log;

//process.on('uncaughtException', function(err) {
    
//    log.info("Uncaught Exception" + err);
//});

