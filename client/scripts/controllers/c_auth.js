'use strict';

app.controller('TwitterAuthCtrl', function($scope) {

});

app.controller('TwitterAuthCallbackCtrl', function($scope,$routeParams, Auth) {
    
    //$scope.userInfo = UserInfo;
    
    //if ($routeParams.status == 'success') {
        

    //    //Faccio la chiamata per recuperare username e dati con le info presenti in sessione

    //    Auth.getUserInfo
    //        .success(function(data, status, headers, config) {
    //            $scope.userInfo.parseUser(data);
    //            $scope.success = true;
    //        })
    //        .error(function(data, status, headers, config) {
    //            $scope.success = false;
    //        });

    //} else {
    //    $scope.success = false;
    //}
    

});


app.controller('TwitterUserCtrl', function($scope,$timeout, $location, Auth) {
    $scope.user = Auth;

    $scope.secondi = 5;

    $scope.cmdDisconnetti = function() {
        Auth.logout();
        $timeout(countDown, 1000); 
    };

    var countDown = function() {
        if ($scope.user.isLoggedIn() == false) {
            if ($scope.secondi == 1) {
                $location.path('/');
            } else {
                $scope.secondi -= 1;
                $timeout(countDown, 1000);
            }
        }
    };
    
    $timeout(countDown, 1000);    
    
});
