'use strict';

angular.module('gsn.services.rest', ['ngResource']).
//angular.module('gpsSiamoNoiApp', ['ngResource']).
    factory('Twitter', function($resource) {
        return $resource('twitter/:command', {}, {
            lookup: { method: 'GET', params: { command: 'lookup' }, isArray: true },
            template: { method: 'GET', params: { command: 'template' } }
        });
    }).
    factory('Tweets', function($resource) {
        return $resource('twitter/profili/:screenName/tweets', {});
    }).
    factory('Linee', function($resource) {
        return $resource('linee/:id', {});
    });