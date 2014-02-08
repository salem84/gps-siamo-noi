var fs = require('fs'),
    _ = require('underscore'),
    log = require('../logger');



module.exports = {

    elencoLinee: function (req, res) {
        log.info('elencoLinee request');

        fs.readdir('linee/', function (err, files) {
            var linee = [];

            if (err) throw err;
            files.forEach(function (file) {
                if (file.indexOf('.json') != -1) {

                    var filename = file.replace('.json', '');
                    var linea = { id: '', name: filename };
                    linee.push(linea);
                }
            });
            res.json(linee);
        });
    },


    dettagliLinea: function (req, res) {

        var lineaNum = req.params.id;
        log.info('dettagliLinea: ' + lineaNum);

        var file = 'linee/' + lineaNum + '.json';
        fs.readFile(file, function (e, data) {
            if (e) {
                res.send(404);
                throw new Error("Linea non esistente: " + lineaNum);
            }
            var txt = '' + data;
            var json = JSON.parse(txt);
            return res.json(json);
        });


    },

    verificaDatiLinea: function (linea, direzione, fermata) {
        try {
            log.info('verificaDatiLinea: L:' + linea + ' D: ' + direzione + ' F: '+fermata);

            var file = 'linee/' + linea + '.json';
            var data = fs.readFileSync(file);

            var txt = '' + data;
            var json = JSON.parse(txt);
            var d = _.findWhere(json.direzioni, { "name": direzione });

            if (d == undefined)
                return false;

            var f = _.findWhere(d.fermate, { "name": fermata });

            if (f == undefined)
                return false;

            return true;

        }
        catch (e) {
            log.err('Eccezione in verificaDatiLinea ' + e);
            return false;
        }
    }
};

