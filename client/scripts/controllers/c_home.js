'use strict';

app.controller('HomeCtrl', function($scope, $location, Auth) {
    $scope.auth = Auth;

    $scope.cmdGoAuthTwitter = function() {
        $location.path('/auth/twitter');
    };
});

