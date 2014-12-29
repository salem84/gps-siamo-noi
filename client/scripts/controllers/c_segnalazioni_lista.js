'use strict';

app.controller('SegnalazioniListCtrl', function($scope) {
    $scope.week = {
        da: moment().startOf('week').format('YYYY-MM-DD'),
        a: moment().endOf('week').format('YYYY-MM-DD')
    };

    
    $scope.giorni = {
        da:  moment().format('YYYY-MM-DD'),
        a:  moment().add(1, 'd').format('YYYY-MM-DD')
    };
    //var b = moment().format();
    $scope.infoReport = $scope.giorni;

    $scope.cmdScaricaElencoSegnalazioni = function () {
        //Segnalazioni.list(
        //    {
        //        startDate: $scope.infoReport.da,
        //        endDate: $scope.infoReport.a
        //    },
        //    function(result) {
        //        alert(result);
        //    }
        //);
        location.href = '/api/segnalazioni/' + $scope.infoReport.da + '/'+ $scope.infoReport.a + '?format=csv';
    };
});

