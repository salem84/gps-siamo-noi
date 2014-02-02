'use strict';

app.controller('NuovaSegnalazioneCtrl', function($scope, $location, DatiInvioSegnalazione, Linee, Twitter) {
    $scope.segnalazione = DatiInvioSegnalazione;

    $scope.linee = Linee.query(function() {
        $scope.$watch('segnalazione.selectedLinea', function() {
            verificaLinea();

        });
    });

    $scope.currentStep = 1;

    $scope.cmdGoStepDirezioni = function() {
        if(this.lineaValida){

            $scope.currentStep++;

            $scope.segnalazione.selectedDirezione = null;
            $scope.segnalazione.selectedFermata = null;

            //carico i dettagli della linea
            Linee.get({ id: $scope.segnalazione.selectedLinea }, function(data) {
                $scope.segnalazione.direzioni = data.direzioni;
            
                
            
            });
            $location.path('/segnalazioni/nuovo/fermata');
        }
    };

    $scope.lineaValida = undefined;

    

    function verificaLinea() {
        var linea = $scope.segnalazione.selectedLinea;
        if (linea != null) {
            if ($scope.linee.indexOfField('name', linea) != -1) {
                $scope.lineaValida = true;
            } else {
                $scope.lineaValida = false;
            }
        }
    }

});

// STEP FERMATE 

app.controller('NuovaSegnalazione_FermataCtrl', function($scope, $location, Linee, Twitter, DatiInvioSegnalazione) {
    $scope.segnalazione = DatiInvioSegnalazione;
    $scope.currentStep = 2;

    $scope.cmdSelezionaDirezione = function(index) {
        $scope.segnalazione.selectedDirezione = $scope.segnalazione.direzioni[index];
        $scope.segnalazione.selectedFermata = null;

    };

    $scope.cmdSelezionaFermata = function(fermata, index) {
        //$scope.segnalazione.selectedFermata = $scope.segnalazione.selectedDirezione.fermate[index];
        $scope.segnalazione.selectedFermata = fermata;
        $scope.segnalazione.selectedFermata.index = index;
    };

    $scope.cmdGoRiepilogo = function() {
        $location.path('/segnalazioni/nuovo/riepilogo');
    };
});

app.controller('NuovaSegnalazione_RiepilogoCtrl', function($scope, $location, Twitter, DatiInvioSegnalazione, Auth) {
    $scope.segnalazione = DatiInvioSegnalazione;
    $scope.auth = Auth;
    $scope.currentStep = 3;

    
    $scope.segnalazione.messaggio = $scope.segnalazione.getParteFissa();
    $scope.tweetSent = undefined;
    
    
    $scope.submitSegnalazione = function() {
        var request = {
            messaggio: $scope.segnalazione.messaggio,
            selectedLinea: $scope.segnalazione.selectedLinea,
            selectedDirezione: $scope.segnalazione.selectedDirezione.name,
            selectedFermata: $scope.segnalazione.selectedFermata.name,
            isAuthenticated: $scope.auth.isLoggedIn()
        };

        Twitter.post(request).$promise.then(
            function(value) { $scope.tweetSent = true; },      
            function(error) { $scope.tweetSent = false; }
        );
    };
});