

exports.index = function(req, res){
  res.render('index', { title: 'Gps siamo noi' });
};


exports.aggiungiSegnalazione = function(req, res){
  res.render('index', { title: 'Gps siamo noi' });
};

exports.linee = require("./linee.js");
exports.twitter = require("./twitter.js");