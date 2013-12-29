'use strict';

angular.module('gsn.services.segnalazioni', []).
//angular.module('gpsSiamoNoiApp').
    factory('DatiInvioSegnalazione', function() {
        var s = {  
            selectedLinea: null,
            selectedDirezione: null,
            selectedFermata: null,
            
            direzioni: null,
            
            note: '',
            
            getParteFissa: function() {
                var parteFissa = '';
                var hashTag = '#test';
                var riepilogo = hashTag + ' ' + this.selectedLinea;
                if (this.selectedDirezione) {
                    riepilogo += ' --> ' + this.selectedDirezione.name;
                }
                if (this.selectedFermata) {
                    riepilogo += ' @' + this.selectedFermata.name;
                }

                if (this.note == '') {
                    parteFissa = riepilogo + ' | ';
                } else {
                    var index = parteFissa.lastIndexOf('|') + 1;
                    var addedText = parteFissa.substr(index);
                    parteFissa = riepilogo + ' | ' + addedText;
                }
                return parteFissa;
            },
            
            getAnteprima: function() {
                var parteFissa = this.getParteFissa();
                return parteFissa + this.note;
            },
            
            getCaratteriRimanenti: function() {
                var anteprima = this.getAnteprima() || '';

                var len = anteprima.length;
                return 140 - len;
            }
     
            
        };
        
        //dati prova
        s.selectedLinea = "3";
        s.selectedDirezione = {
            "id_relation": "1380980",
            "name": "Valle Giulia -> P.le Ostiense",
            "fermate": [{ "id_node": "813832903", "codice": "01", "name": " Valle Giulia" }, { "id_node": "1675888394 ", "codice": "02", "name": "Galleria Arte Moderna" }, { "id_node": "1675888287", "codice": "03", "name": "Aldrovandi", "index": 2 }, { "id_node": "1675888317", "codice": "04", "name": "Bioparco" }]
        };

        s.selectedFermata = { "id_node": "1675888287", "codice": "03", "name": "Aldrovandi", "index": 2 };
        return s;
    });