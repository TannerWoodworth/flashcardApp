var flashcardApp = angular.module('flashcardApp', ['ngRoute']);

// ROUTES
/////////////////////////////////////////////////

flashcardApp.config(function ($routeProvider, $locationProvider){

$locationProvider.hashPrefix('');

$routeProvider
	.when('/', {
		templateUrl:'partials/splash.html',
		controller:'splashController'
	})
	
	.when('/create', {
		templateUrl:'partials/create.html',
		controller:'createController'
	})

	.when('/save', {
		templateUrl:'partials/save.html',
		controller:'saveController'
	})
	
	.when('/study', {
		templateUrl:'partials/study.html',
		controller:'studyController'
	})

});

// FACTORIES
/////////////////////////////////////////////////

flashcardApp.factory('cards', function() {
   
   var savedCards = [];

		return savedCards;
  
});

// CONTROLLERS
/////////////////////////////////////////////////

flashcardApp.controller('splashController', ['$scope', 'cards', function($scope, cards) {
	$scope.savedCards = cards;
	$scope.importFieldId = document.getElementById('import-area');
	$scope.importFieldContent = '';

	$scope.displayImport = function() {
		$scope.importFieldId.style.display = 'block';
	}

	$scope.importCards = function() {
		console.log($scope.importFieldContent);
	}

}]);

flashcardApp.controller('createController', ['$scope', 'cards', function($scope, cards) {

	$scope.currentFront = '';
	$scope.currentBack = '';
	$scope.savedCards = cards;

	$scope.addNewCard = function() {

		$scope.cardId = $scope.savedCards.length;
		$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.cardId};

		$scope.savedCards.push($scope.newCard);

		$scope.currentFront = '';
		$scope.currentBack = '';
	}

	$scope.removeCard = function(el) {
		console.log('REMOVE CARD');
	}

	$scope.editCard = function(el) {
		console.log('EDIT');

	}


}]);

flashcardApp.controller('saveController', ['$scope', 'cards', function($scope, cards) {

	$scope.cardSetName = 'Ex. Data structures and algorithms';
	$scope.savedCards = cards;

// EXPORTING JSON OBJECT

	$scope.exportCards = function() {
		$scope.exportedObject = JSON.stringify($scope.savedCards);
		$scope.fileName = $scope.cardSetName + '.json';

		$scope.psudoBtn = document.createElement('a');
	  $scope.psudoBtn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($scope.exportedObject));
	  $scope.psudoBtn.setAttribute('download', $scope.fileName);

	  $scope.psudoBtn.style.display = 'none';
  	document.body.appendChild($scope.psudoBtn);
  	$scope.psudoBtn.click();
  	document.body.removeChild($scope.psudoBtn);
	}

}]);

flashcardApp.controller('studyController', ['$scope', 'cards', function($scope, cards) {

	$scope.savedCards = cards;
	$scope.cardStackSize = $scope.savedCards.length - 1;
	$scope.currentCardText = $scope.savedCards[0].front;
	$scope.currentCardside = 0;
	$scope.currentCardId = $scope.savedCards[0].id;

	// console.log('Card Stack Size: ' + $scope.cardStackSize);
	// console.log('Current Card Id: ' + $scope.currentCardId);

	$scope.nextCard = function() {

		if ($scope.currentCardId < $scope.cardStackSize) {
			$scope.currentCardId = $scope.currentCardId + 1;
			$scope.currentCardText = $scope.savedCards[$scope.currentCardId].front;
		} else {
			$scope.currentCardId = 0;
			$scope.currentCardText = $scope.savedCards[0].front;
		}

		$scope.currentCardside = 0;
	}

	$scope.previousCard = function() {

		if ($scope.currentCardId === 0) {
			$scope.currentCardId = $scope.cardStackSize;
			$scope.currentCardText = $scope.savedCards[$scope.currentCardId].front;
		} else {
			$scope.currentCardId = $scope.currentCardId - 1;
			$scope.currentCardText = $scope.savedCards[$scope.currentCardId].front;
		}

		$scope.currentCardside = 0;
	}

	$scope.flipCard = function() {

		if ($scope.currentCardside === 0) {
			// Back
			$scope.currentCardside = 1
			$scope.currentCardText = $scope.savedCards[$scope.currentCardId].back;
		} else {
			// Front
			$scope.currentCardside = 0
			$scope.currentCardText = $scope.savedCards[$scope.currentCardId].front;
		}
	}

}]); 

// DIRECTIVES
/////////////////////////////////////////////////

flashcardApp.directive("finishedCard", function() {
	return {
		templateUrl: 'directives/finishedCard.html',
		replace: false,
		scope: {
			cardObject: "="
		},
		link: function (scope, element, attributes) {
      attributes.$observe('currentCardId', function(newValue) {
        scope.currentCardId = newValue
      })
    }
	}
});
