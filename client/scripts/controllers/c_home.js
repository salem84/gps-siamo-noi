'use strict';

app.controller('HomeCtrl', function($scope, $location, Auth) {
    $scope.user = Auth.user;

    $scope.cmdGoAuthTwitter = function() {
        $location.path('/auth/twitter');
    };
});

