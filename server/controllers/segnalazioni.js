var db = require('../utils/database.js'),
    log = require('../logger.js'),
    moment = require('moment-timezone');

module.exports = {
    inviaSegnalazione: function(req, res) {
        log.info("salvataggio segnalazione...");
        var linea = req.body.linea,
            tipologia = req.body.tipologia,
            descrizione = req.body.descrizione,
            ora = moment().tz('Europe/Rome').format();

        var segnalazione = new db.Segnalazione(
        {
            linea: linea,
            tipologia: tipologia,
            descrizione: descrizione,
            created: ora
        });

        segnalazione.save(function (err) {
            if (err) {
                log.err(err);
                res.send(500);
            } else {
                log.info("salvataggio segnalazione completato");
                res.send(200);
            };
        });
    }
};