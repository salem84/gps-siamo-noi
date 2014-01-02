var config = require('../config');
var sendgrid  = require('sendgrid')(config.sendgrid.api_user, config.sendgrid.api_key);

module.exports = {
    inviaSegnalazione: function(req, res) {
        var motivo = req.body.motivo,
            descrizione = req.body.descrizione,
            email = req.body.email;

        var subject = 'Segnalazione inviata da gpssiamonoi.it';
        var testo = 'Inviata da ' + email + '\n';
        testo += 'Motivo: ' + motivo + '\n';
        testo += 'Descrizione: ' + descrizione + '\n';

        sendgrid.send({
                to: 'giorgio.lasala@gmail.com',
                from: 'assistenza@gpssiamonoi.it',
                subject: subject,
                text: testo
            }, function(err, json) {
                if (err) {
                    console.error(err);
                    res.send(500);

                }
                console.log(json);
                res.send(200);

            });
    }
};