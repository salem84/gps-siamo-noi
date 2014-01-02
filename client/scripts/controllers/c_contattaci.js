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
        return selectedMotivoSegnalazione && descrizione && email;
    };

    $scope.emailInviata = undefined;

    $scope.cmdInvia = function() {
        Assistenza.post({ motivo: $scope.selectedMotivoSegnalazione, descrizione: $scope.descrizione, email: $scope.email },
        function(result) {
            
        });
    };
});
