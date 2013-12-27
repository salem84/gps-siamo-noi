angular.module('twitterServices', ['ngResource']).
		  factory('Twitter', function($resource) {
			return $resource('twitter/:screenName', {}, {
			  query: { method: 'GET', params: { screenName: 'lookup' }, isArray: true }
			})
		  }).
		 factory('Tweets', function($resource) {
			return $resource('twitter/:screenName/tweets', {});
		  });