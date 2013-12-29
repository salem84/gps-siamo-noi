'use strict';

app.controller('TweetsProfiloCtrl', function($scope, Tweets) {

        $scope.profilo = $routeParams.profilo;
        $scope.tweets = Tweets.query({ screenName: $routeParams.profilo });

        $scope.cmdPreviousTweets = function() {
            var lastId = getLastId();
            Tweets.query({ screenName: $routeParams.profilo, maxId: lastId }, function(result) {
                $scope.tweets = $scope.tweets.concat(result);
            });

        };

        //$scope.lastId = function() {

        function getLastId() {
            var len = $scope.tweets.length;
            if (len > 0)
                return $scope.tweets[len - 1].id;
            else
                return "";
        }

        ;
    });
