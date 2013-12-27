angular.module('gpsSiamoNoiApp', ['twitterServices'])
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/segnalazioni', { templateUrl: 'partials/list.html', controller: SegnalazioniListCtrl }).
		when('/profiliTwitter', { templateUrl: 'partials/profiliTwitter.html', controller: ProfiliTwitterCtrl }).
		when('/profiliTwitter/:profilo', { templateUrl: 'partials/tweets.html', controller: TweetsProfiloCtrl }).
		// when('/poll/:pollId', { templateUrl: 'partials/item.html', controller: PollItemCtrl }).
		when('/segnala', { templateUrl: 'partials/new.html', controller: NuovaSegnalazioneCtrl }).
		otherwise({ redirectTo: '/profiliTwitter' });
	}]);