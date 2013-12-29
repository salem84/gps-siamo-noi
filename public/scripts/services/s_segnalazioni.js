'use strict';

angular.module('gsn.services.segnalazioni', []).
//angular.module('gpsSiamoNoiApp').
    factory('DatiInvioSegnalazione', function() {
        var s = {  
            selectedLinea: null,
            selectedDirezione: null,
            selectedFermata: null,
            
            direzioni: null,
            
            segnalazione: '',
            
            getAnteprima: function() {
                var hashTag = '#test';
                var riepilogo = hashTag + ' ' + $scope.selectedLinea.name;
                if (selectedDirezione) {
                    riepilogo += ' --> ' + $scope.selectedDirezione.name;
                }
                if (selectedFermata) {
                    riepilogo += ' @' + $scope.selectedFermata.name;
                }

                if (segnalazione == '') {
                    segnalazione = riepilogo + ' | ';
                } else {
                    var index = segnalazione.lastIndexOf('|') + 1;
                    var addedText = segnalazione.substr(index);
                    segnalazione = riepilogo + ' | ' + addedText;
                }

            }
        };

        return s;
    });