'use strict';

app.controller('ProfiliTwitterCtrl', function($scope, Twitter) {


        $scope.profili = Twitter.query();

    });


