exports.elencoLinee = function(req, res) {
    var linee = [{ id: '001', name: '3' }, { id: '002', name: '3B' }];
	res.json(linee);
};

exports.dettagliLinea = function(req, res){
	var lineaId = req.params.id;
	res.render('index', { title: 'Gps siamo noi' });
};
