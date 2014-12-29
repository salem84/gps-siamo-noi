var config = require('../config'),
    log = require('../logger.js'),
    sendgrid = require('sendgrid')(config.sendgrid.api_user, config.sendgrid.api_key);

module.exports = {
    richiediAssistenza: function (req, res) {
        log.info('Invio email richiesta assistenza');
        var motivo = req.body.motivo,
            descrizione = req.body.descrizione,
            email = req.body.email;

        var subject = 'Richiest Assistenza da ilgpssiamonoi.com';
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
                    log.err(err);
                    res.status(500).end();

                }
                log.info(json);
                res.status(200).end();

            });
    }
};