exports.linee = require("./linee.js");
exports.twitter = require("./twitter.js");

exports.index = function(req, res){
  res.render('index', { title: 'Gps siamo noi' });
};


