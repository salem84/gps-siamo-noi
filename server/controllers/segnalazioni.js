var db = require('../utils/database.js'),
    log = require('../logger.js'),
    moment = require('moment-timezone'),
    json2csv = require('json2csv');

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
            data: ora
        });

        segnalazione.save(function (err) {
            if (err) {
                log.err(err);
                res.status(500).end();
            } else {
                log.info("salvataggio segnalazione completato");
                res.status(200).end();
            };
        });
    },

    getSegnalazioni : function(req, res) {
        log.info("Get Lista Segnalazioni");
        
        var startDate = moment(req.params.startDate);
        if (!startDate.isValid()) {
            res.status(500).send("StartDate non valida");
            return;
        }

        log.info("StartDate: " + startDate.format());
        
        var endDate = moment(req.params.endDate);
        if (req.params.endDate == undefined || !endDate.isValid()) {
            log.info("EndDate non passata o non valida");
            endDate = moment(startDate).add(1, 'days');
        }
        log.info("EndDate: " + endDate.format());

        
        //db.Segnalazione.ensureIndex({ data: 1 });
        var query = { data: { $gte: startDate, $lt: endDate } };
        

        db.Segnalazione.find(query, function (err, documents) {
            log.info("Segnalazioni trovate: " + documents.length);
            //documents.forEach(function(doc) {
            //    res.write(doc);
            //});
            
            if (req.query['format'] == 'csv') {
                //res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                var json2csvCallback = function (err, csv) {
                    if (err) {
                        log.err(err);
                        res.status(500).end();
                    }
                    res.setHeader("Content-Disposition", "attachment; filename=" + "report.csv");
                    res.send(csv);
                };

                json2csv({ data: documents, fields: ['data', 'tipologia', 'linea', 'descrizione' ], del: ';' }, json2csvCallback);

            } else {
                res.send(documents);
                res.status(200).end();
            }
            
        });
        
    }
};