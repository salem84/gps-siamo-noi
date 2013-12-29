angular.module('twitterServices', ['ngResource']).
    factory('Twitter', function($resource) {
        return $resource('twitter/:screenName', {}, {
            query: { method: 'GET', params: { screenName: 'lookup' }, isArray: true },
            post: { method: 'POST', params: { screenName: '' } }
        });
    }).
    factory('Tweets', function($resource) {
        return $resource('twitter/:screenName/tweets', {});
    }).
    factory('Linee', function($resource) {
        return $resource('linee/:id', {});
    });