﻿'use strict';

app.controller('SegnalazioneProblemaCtrl', function($scope, Segnalazioni) {
    $scope.tipologie = [
        { id: 1, nome: 'Ritardo' },
        { id: 2, nome: 'Sciopero' },
        { id: 3, nome: 'Blocco linea' }
    ];

    $scope.segnalazioneInviata = undefined;

    $scope.selectedTipologia = undefined;
    $scope.linea = undefined;
    $scope.tipologia = undefined;
    $scope.descrizione = undefined;

    $scope.cmdSelezionaTipologia = function(id) {
        $scope.selectedTipologia = $scope.tipologie[id - 1];

    };

    $scope.isValid = function() {
        return $scope.selectedTipologia && $scope.linea;
    };

    $scope.cmdInviaSegnalazione = function() {
        Segnalazioni.invia({
                linea: $scope.linea,
                tipologia: $scope.selectedTipologia.nome,
                descrizione: $scope.descrizione
            },
            function(data) {
                $scope.segnalazioneInviata = true;
            },
            function(err) {
                $scope.segnalazioneInviata = false;
            });
    };

});