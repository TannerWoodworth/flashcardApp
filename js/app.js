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
   
   var savedCards = [
		{
			front: 'Card Front 1 from factory',
			back: 'Card Back 1',
			id: 1
		},
		{
			front: 'Card Front 2',
			back: 'Card Back 2',
			id: 2
		},
		{
			front: 'Card Front 3',
			back: 'Card Back 3',
			id: 3
		},
		{
			front: 'Card Front 4',
			back: 'Card Back 4',
			id: 4
		}];

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
		console.log('Front: ' + $scope.currentFront);
		console.log('Back: ' + $scope.currentBack);
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
