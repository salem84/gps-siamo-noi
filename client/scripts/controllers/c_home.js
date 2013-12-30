'use strict';

app.controller('HomeCtrl', function($scope, $location, UserInfo) {
    $scope.userInfo = UserInfo;

    $scope.cmdGoAuthTwitter = function() {
        $location.path('/auth/twitter');
    };
});

