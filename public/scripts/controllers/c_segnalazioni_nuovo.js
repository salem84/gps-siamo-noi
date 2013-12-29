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

    $scope.cmdSelezionaDirezione = function(index) {
        $scope.segnalazione.selectedDirezione = $scope.segnalazione.direzioni[index];
        $scope.segnalazione.selectedFermata = null;

    };

    $scope.cmdSelezionaFermata = function(index) {
        $scope.segnalazione.selectedFermata = $scope.segnalazione.selectedDirezione.fermate[index];
        $scope.segnalazione.selectedFermata.index = index;
    };

    $scope.cmdGoRiepilogo = function() {
        $location.path('/segnalazioni/nuovo/riepilogo');
    };
});

app.controller('NuovaSegnalazione_RiepilogoCtrl', function($scope, $location, Linee, Twitter, DatiInvioSegnalazione) {
    $scope.segnalazione = DatiInvioSegnalazione;
    $scope.currentStep = 3;
    
    //$scope.caratteriRimanenti = function() {
    //    if ($scope.segnalazione) {
    //        var len = $scope.segnalazione.getAnteprima();
    //        return 140 - len;
    //    } else {
    //        return 0;
    //    }
    //};

    //$scope.anteprima = function() {
    //    if ($scope.segnalazione) {
    //        return $scope.segnalazione.getAnteprima();
    //    } else {
    //        return '';
    //    }
    //};
    
    
    $scope.submitSegnalazione = function() {
        Twitter.post({ msg: 'prova' });
    };
});