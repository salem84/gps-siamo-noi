'use strict';

app.controller('TweetsProfiloCtrl', function($scope, $routeParams, Tweets) {

    $scope.profilo = $routeParams.profilo;
    Tweets.query({ screenName: $routeParams.profilo }, function(result) {
        $scope.tweets = result;
        $scope.isBusy = false;
    });

    $scope.isBusy = true;
    $scope.isLoadingPage = false;

    $scope.cmdPreviousTweets = function() {
        $scope.isLoadingPage = true;
        var lastId = getLastId();
        Tweets.query({ screenName: $routeParams.profilo, maxId: lastId }, function(result) {
            $scope.tweets = $scope.tweets.concat(result);
            $scope.isLoadingPage = false;
        });

    };

    $scope.getLoadingText = function() {
        if ($scope.isLoadingPage) {
            return 'Caricamento...';
        } else {
            return '&larr; Pi&ugrave; vecchi';
        }
    };


    function getLastId() {
        var len = $scope.tweets.length;
        if (len > 0)
            return $scope.tweets[len - 1].id;
        else
            return "";
    }


});
