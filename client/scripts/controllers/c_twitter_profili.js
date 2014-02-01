'use strict';

app.controller('ProfiliTwitterCtrl', function($scope, $location, Twitter) {


    $scope.profili = Twitter.lookup();

    $scope.bgs_colors = ['#c36', '#9c3', '#048fc2', '#ffb600', '#a9a9a9'];
    $scope.bge_colors = ['#9d1f60', '#693 ', '#069', '#d89700', '#666'];
    $scope.fg_colors = ['white', 'white', 'white', 'white', 'white'];

    
  $scope.wh = '#fff';
  $scope.bl = '#000';

    $scope.goTweetsPage = function(screenName) {
        var url = '/twitter/profili/' + screenName;
        $location.path(url);
    };
    
});


