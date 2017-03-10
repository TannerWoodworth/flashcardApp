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

// IMPORTING JSON OBJECT
	$scope.importCards = function() {
		console.log('Import!');
	}

}]);

flashcardApp.controller('createController', ['$scope', 'cards', function($scope, cards) {

$scope.currentFront = 'Card Front Text';
$scope.currentBack = 'Card Back Text';
$scope.savedCards = cards;

	$scope.addNewCard = function() {

		$scope.cardId = $scope.savedCards.length;
		$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.cardId};

		$scope.savedCards.push($scope.newCard);

		$scope.currentFront = 'Card Front Text';
		$scope.currentBack = 'Card Back Text';
	}

	$scope.removeCard = function() {
		console.log('REMOVE CARD');
	}

}]);

flashcardApp.controller('saveController', ['$scope', 'cards', function($scope, cards) {

	$scope.cardSetName = 'Ex. Data structures and algorithms';
	$scope.savedCards = cards;

// PARSING JSON OBJECT



// EXPORTING JSON OBJECT

	$scope.exportCards = function() {
		console.log('Export!');
		console.log($scope.cardSetName);
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
		}
	}
});
