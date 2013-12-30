'use strict';

app.controller('ProfiliTwitterCtrl', function($scope, $location, Twitter) {


    $scope.profili = Twitter.lookup();

    $scope.bg_colors = ['#c36', '#9c3', '#048fc2', '#ffb600'];
    $scope.fg_colors = ['white', 'white', 'white'];

    $scope.goTweetsPage = function(screenName) {
        var url = '/twitter/profili/' + screenName;
        $location.path(url);
    };
    
});


