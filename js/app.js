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

	$scope.addNewCard = function(savedCards) {

		$scope.cardId = $scope.savedCards.length + 1;
		$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.cardId};

		$scope.savedCards.push($scope.newCard);
	}

	$scope.removeCard = function(savedCards) {
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

	$scope.nextCard = function(savedCards) {
		console.log('NEXT CARD');
	}

	$scope.previousCard = function(savedCards) {
		console.log('PREVIOUS CARD');
	}

	$scope.flipCard = function(savedCards) {
		console.log('FLIP CARD');
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
