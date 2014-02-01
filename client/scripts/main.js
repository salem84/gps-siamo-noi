'use strict';

var app = angular.module('gpsSiamoNoiApp', [
    'ngRoute',
    'ngCookies',
    //'ngResource',
    'ngSanitize',
    'gsn.services.rest',
    'gsn.services.segnalazioni',
    'gsn.services.user',
    'ui.bootstrap'
]);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        }).
        //when('/segnalazioni', {
        //     templateUrl: 'views/list.html', 
        //     controller: 'SegnalazioniListCtrl'
        //}).
        when('/segnalazioni', {
            redirectTo: function() {
                return '/twitter/profili/movesharing';
            }
        }).
        when('/contattaci', {
            templateUrl: '/views/contattaci.html',
            controller: 'ContattaciCtrl'
        }).
        when('/twitter/profili', {
            templateUrl: '/views/profiliTwitter.html',
            controller: 'ProfiliTwitterCtrl'
        }).
        when('/twitter/profili/:profilo', {
            templateUrl: '/views/tweets.html',
            controller: 'TweetsProfiloCtrl'
        }).
        when('/segnalazioni/nuovo', {
            templateUrl: '/views/segnalazioni/nuovo/1_scegli_linea.html',
            controller: 'NuovaSegnalazioneCtrl'
        }).
        when('/segnalazioni/nuovo/fermata', {
            templateUrl: '/views/segnalazioni/nuovo/2_scegli_fermata.html',
            controller: 'NuovaSegnalazione_FermataCtrl'
        }).
        when('/segnalazioni/nuovo/riepilogo', {
            templateUrl: '/views/segnalazioni/nuovo/3_riepilogo.html',
            controller: 'NuovaSegnalazione_RiepilogoCtrl'
        }).
        when('/auth/twitter', {
            templateUrl: '/views/auth/twitterAuth.html',
            controller: 'TwitterAuthCtrl'
        }).
        when('/auth/twitter/user', {
            templateUrl: '/views/auth/twitterUser.html',
            controller: 'TwitterUserCtrl'
        }).
        when('/auth/twitter/callback/:status', {
            templateUrl: '/views/auth/twitterAuthCallback.html',
            controller: 'TwitterAuthCallbackCtrl'
        }).
        when('/404', {
            templateUrl: '/views/404.html',
        }).
        otherwise({ redirectTo: '/404' });


    $locationProvider.html5Mode(true);
});

app.config(['$httpProvider', function ($httpProvider) {
    var $http,
        interceptor = ['$q', '$injector', function ($q, $injector) {
            var error;

            function success(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $('#loading-widget').hide();
                }
                return response;
            }

            function error(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $('#loading-widget').hide();
                }
                return $q.reject(response);
            }

            return function(promise) {
                $('#loading-widget').show();
                return promise.then(success, error);
            };
        }];

    $httpProvider.responseInterceptors.push(interceptor);
}]);
