'use strict';

app.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;

    $scope.linkUrl = function() {
        if (Auth.isLoggedIn()) {
            return '/auth/twitter/user';
        } else {
            return '/auth/twitter';
        }
    };

    $scope.linkText = function() {
        if (Auth.isLoggedIn()) {
            return '@' + Auth.user.username;
        } else {
            return 'Login';
        }
    };
    //$scope.userRoles = Auth.userRoles;
    //$scope.accessLevels = Auth.accessLevels;

    //$scope.logout = function() {
    //    Auth.logout(function() {
    //        $location.path('/login');
    //    }, function() {
    //        $rootScope.error = "Failed to logout";
    //    });
    //};
}]);