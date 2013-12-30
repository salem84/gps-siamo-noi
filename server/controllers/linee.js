module.exports = {
    elencoLinee: function(req, res) {
        var linee = [{ id: '001', name: '3' }, { id: '002', name: '3B' }];
        res.json(linee);
    },
    

    dettagliLinea: function(req, res) {
        var fs = require('fs');
        var lineaNum = req.params.id;
        var file = 'linee/' + lineaNum + '.json';
        fs.readFile(file, function(e, data) {
            if (e) {
                throw e;
            }
            var txt = '' + data;
            var json = JSON.parse(txt);
            return res.json(json);
        });

    }
};

