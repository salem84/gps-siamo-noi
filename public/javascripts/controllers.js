// Creating a new poll
function NuovaSegnalazioneCtrl($scope) {
	$scope.linee = [{ id: '001', name: '3'}, { id: '002', name: '3B'}];
	// $scope.selectedLinea = null;

	$scope.$watch('selectedLinea', function() {
		if($scope.selectedLinea != null) {
			$scope.direzioni = [{name: $scope.selectedLinea.name + ' AND'}, {name: $scope.selectedLinea.name  + ' RIT'}];
			$scope.fermate = [];
		}
	});
	// $scope.direzioni = function() {
	// 	if($scope.selectedLinea != null) {
	//  		$scope.direzioni = [{name: $scope.selectedLinea.name + ' AND'}, {name: $scope.selectedLinea.name  + ' RIT'}];
	//  		$scope.fermate = [];
	//  	}
	// }

	// $scope.selectedDirezione = null;

	$scope.$watch('selectedDirezione', function() {
		if($scope.selectedDirezione != null) {
			$scope.fermate = [{name: $scope.selectedDirezione.name  + ' F1'}, {name: $scope.selectedDirezione.name  + ' F2'}, 
			{name: $scope.selectedDirezione.name  + ' F3'}, {name: $scope.selectedDirezione.name  + ' F4'}];
		}
	});
	// $scope.selectedFermata = null;

	$scope.segnalazione = {
		
	};

	
}

function SegnalazioniListCtrl($scope) {
	

	
}

function ProfiliTwitterCtrl($scope, Twitter) {
	$scope.profili = Twitter.query();

}


function TweetsProfiloCtrl($scope, $routeParams, Tweets) {
	$scope.profilo =  $routeParams.profilo;
	$scope.tweets = Tweets.query({screenName: $routeParams.profilo});

	$scope.lastId = function() {
		var len = $scope.tweets.length;
		if(len > 0)
			return $scope.tweets[len-1].id;
		else
			return "";
	}
}
