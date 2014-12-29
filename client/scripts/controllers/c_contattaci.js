'use strict';

app.controller('ContattaciCtrl', function($scope, Assistenza) {
    $scope.motiviSegnalazione = ['Ho un problema', 'Aggiunta funzionalità', 'Manca una linea', 'Altro...'];

    $scope.selectedMotivoSegnalazione = undefined;
    $scope.descrizione = undefined;
    $scope.email = undefined;
    
    $scope.cmdSelezionaMotivo = function(index) {
        $scope.selectedMotivoSegnalazione = $scope.motiviSegnalazione[index];

    };

    $scope.isValid = function() {
        return $scope.selectedMotivoSegnalazione && $scope.descrizione && $scope.email;
    };

    $scope.emailInviata = undefined;

    $scope.cmdInvia = function() {
        Assistenza.invia({ motivo: $scope.selectedMotivoSegnalazione, descrizione: $scope.descrizione, email: $scope.email },
        function (data) {
            $scope.emailInviata = true;
        },
            function (err) {
            $scope.emailInviata = false;
        });
    };
});
