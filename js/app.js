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

// SERVICES
/////////////////////////////////////////////////

flashcardApp.service('cardService', function() {
   
   this.savedCards = [
		{
			front: 'Card Front 1',
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
  
});

// CONTROLLERS
/////////////////////////////////////////////////

flashcardApp.controller('splashController', ['$scope', 'cardService', function($scope, cardService) {

// IMPORTING JSON OBJECT
	$scope.importCards = function() {
		console.log('Import!');
	}

}]);

flashcardApp.controller('createController', ['$scope', 'cardService', function($scope, cardService) {

$scope.currentFront = 'Card Front Text';
$scope.currentBack = 'Card Back Text';

$scope.savedCards = [
		{
			front: 'Card Front 1',
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

	$scope.addNewCard = function(savedCards) {
		console.log('Front: ' + $scope.currentFront);
		console.log('Back: ' + $scope.currentBack);
	}

}]);

flashcardApp.controller('saveController', ['$scope', 'cardService', function($scope, cardService) {

	$scope.cardSetName = 'Ex. Data structures and algorithms';

// PARSING JSON OBJECT



// EXPORTING JSON OBJECT

	$scope.exportCards = function() {
		console.log('Export!');
		console.log($scope.cardSetName);
	}

}]);

flashcardApp.controller('studyController', ['$scope', 'cardService', function($scope, cardService) {

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
