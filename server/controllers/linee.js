var fs = require('fs');

module.exports = {
    
    elencoLinee: function(req, res) {
        fs.readdir('linee/', function(err, files) {
            var linee = [];

            if (err) throw err;
            files.forEach(function(file) {
                if (file.indexOf('.json') != -1) {

                    var filename = file.replace('.json', '');
                    var linea = { id: '', name: filename };
                    linee.push(linea);
                }
            });
            res.json(linee);
        });
    },
    

    dettagliLinea: function(req, res) {

        var lineaNum = req.params.id;
        var file = 'linee/' + lineaNum + '.json';
        fs.readFile(file, function(e, data) {
            if (e) {
                res.send(404);
                throw new Error("Linea non esistente: " + lineaNum);
            }
            var txt = '' + data;
            var json = JSON.parse(txt);
            return res.json(json);
        });


    }
};

