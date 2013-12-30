'use strict';

app.controller('TwitterAuthCtrl', function($scope) {

});

app.controller('TwitterAuthCallbackCtrl', function($scope,$routeParams, Auth, UserInfo) {
    
    $scope.userInfo = UserInfo;
    
    if ($routeParams.status == 'success') {
        

        //Faccio la chiamata per recuperare username e dati con le info presenti in sessione

        Auth.getUserInfo
            .success(function(data, status, headers, config) {
                $scope.userInfo.parseUser(data);
                $scope.success = true;
            })
            .error(function(data, status, headers, config) {
                $scope.success = false;
            });

    } else {
        $scope.success = false;
    }
    

});


app.controller('TwitterUserCtrl', function($scope,$timeout, $location, UserInfo) {
    $scope.userInfo = UserInfo;

    $scope.secondi = 5;

    $scope.cmdDisconnetti = function() {
        UserInfo.disconnetti();

    };

    var countDown = function() {
        if ($scope.userInfo.isLogged == false) {
            if ($scope.secondi == 0) {
                $location.path('/');
            } else {
                $scope.secondi -= 1;
                $timeout(countDown, 1000);
            }
        }
    };
    
    $timeout(countDown, 1000);    
    
});
