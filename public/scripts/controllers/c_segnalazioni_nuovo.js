'use strict';

app.controller('NuovaSegnalazioneCtrl', function($scope, $location, DatiInvioSegnalazione, Linee, Twitter) {
    $scope.segnalazione = DatiInvioSegnalazione;

    $scope.linee = Linee.query();

    $scope.currentStep = 1;

    $scope.cmdGoStepDirezioni = function() {
        $scope.currentStep++;


        //carico i dettagli della linea
        Linee.get({ id: $scope.segnalazione.selectedLinea }, function(data) {
            $scope.segnalazione.direzioni = data.direzioni;
            
            $scope.segnalazione.selectedDirezione = null;
            $scope.segnalazione.selectedFermata = null;
            
        });
        $location.path('/segnalazioni/nuovo/fermata');

    };

    $scope.lineaValida = undefined;

    $scope.$watch('selectedLinea', function() {
        var linea = $scope.segnalazione.selectedLinea;
        if (linea != null) {
            if ($scope.linee.indexOfField('name', linea)) {
                $scope.lineaValida = true;
            } else {
                $scope.lineaValida = false;
            }
        }

    });


});

// STEP FERMATE 

app.controller('NuovaSegnalazione_FermataCtrl', function($scope, $location, Linee, Twitter, DatiInvioSegnalazione) {
    $scope.segnalazione = DatiInvioSegnalazione;
    $scope.currentStep = 2;

    $scope.caratteriRimanenti = function() {
        var len = $scope.segnalazione.length;
        return 140 - len;
    };

    $scope.submitSegnalazione = function() {
        Twitter.post({ msg: 'prova' });
    };
       

    $scope.cmdSelezionaDirezione = function(index) {
        $scope.segnalazione.selectedDirezione = $scope.segnalazione.direzioni[index];

    };

    $scope.cmdSelezionaFermata = function(index) {
        $scope.segnalazione.selectedFermata = $scope.segnalazione.selectedDirezione.fermate[index];
        $scope.segnalazione.selectedFermata.index = index;
    };
        

});
