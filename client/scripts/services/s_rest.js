'use strict';

angular.module('gsn.services.rest', ['ngResource']).
//angular.module('gpsSiamoNoiApp', ['ngResource']).
    factory('Twitter', function($resource) {
        return $resource('/api/twitter/:command', {}, {
            lookup: { method: 'GET', params: { command: 'lookup' }, isArray: true },
            template: { method: 'GET', params: { command: 'template' } },
            post: { method: 'POST', params: { command: '' } }
        });
    }).
    factory('Tweets', function($resource) {
        return $resource('/api/twitter/profili/:screenName/tweets', {});
    }).
    factory('Linee', function($resource) {
        return $resource('/api/linee/:id', {});
    }).
    factory('Segnalazioni', function($resource) {
        return $resource('/api/segnalazioni/', {}, {
            post: { method: 'POST' }
        });
    }).
    factory('Assistenza', function($resource) {
        return $resource('/api/assistenza/', {}, {
            post: { method: 'POST' }
        });
        //}).
        //factory('HttpAuth', function($http) {
        //    var s = {            
        //        //getUserInfo2: $http({method: 'GET', url: '/api/auth/twitter/get_userinfo'})
        //    };

        //    return s;
    });