var config = require('./config'),
    log;

if ('console' == config.logger.name) {
    log = {        
      info: function(msg) {
          console.log(msg);
      },
      err: function(msg) {
          console.log('Error: '+msg);
      }
    };
} 
else {
    
}

module.exports = log;

//process.on('uncaughtException', function(err) {
    
//    log.info("Uncaught Exception" + err);
//});

