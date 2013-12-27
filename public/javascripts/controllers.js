// Creating a new poll
function NuovaSegnalazioneCtrl($scope, Twitter) {
	$scope.linee = [{ id: '001', name: '3'}, { id: '002', name: '3B'}];
	// $scope.selectedLinea = null;

	$scope.$watch('selectedLinea', function() {
		if($scope.selectedLinea != null) {
			$scope.direzioni = [{name: $scope.selectedLinea.name + ' AND'}, {name: $scope.selectedLinea.name  + ' RIT'}];
			$scope.fermate = [];
		    $scope.selectedDirezione = null;
		    $scope.selectedFermata = null;
		    updateSegnalazione();
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
            $scope.selectedFermata = null;
		    
		    updateSegnalazione();
		}
	});
	// $scope.selectedFermata = null;

    $scope.$watch('selectedFermata', function() {
        if ($scope.selectedFermata != null) {
            updateSegnalazione();
        }
    });

    $scope.segnalazione = "";

    $scope.caratteriRimanenti = function() {
        var len = $scope.segnalazione.length;
        return 140 - len;
    };

    $scope.submitSegnalazione = function() {
        Twitter.post({ msg: 'prova' });
    };

	function updateSegnalazione() {
	    var hashTag = '#test';
	    var riepilogo = hashTag + ' ' + $scope.selectedLinea.name;
	    if ($scope.selectedDirezione) {
	        riepilogo += ' --> ' + $scope.selectedDirezione.name;
	    }
        if ($scope.selectedFermata) {
	        riepilogo += ' @' + $scope.selectedFermata.name;
	    }
         
	    if ($scope.segnalazione == '') {
	        $scope.segnalazione = riepilogo + ' |';
	    } else {
	        var index = $scope.segnalazione.lastIndexOf('|') +1; 
	        var addedText = $scope.segnalazione.substr(index);
	        $scope.segnalazione = riepilogo + ' |' + addedText;
	    }
	    
	}
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
        if (len > 0)
            return $scope.tweets[len - 1].id;
        else
            return "";
    };
}
