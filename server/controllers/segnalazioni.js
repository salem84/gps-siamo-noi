var Segnalazione = require('../utils/database.js'),
    log = require('../logger.js');

module.exports = {
    inviaSegnalazione: function(req, res) {
        log.info("salvataggio segnalazione...");
        
        var linea = req.body.linea,
            tipologia = req.body.tipologia,
            descrizione = req.body.descrizione;

        var segnalazione = new Segnalazione(
        {
            linea: linea,
            tipologia: tipologia,
            descrizione: descrizione
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