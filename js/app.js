var flashcardApp = angular.module('flashcardApp', ['ngRoute']);

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

// CONTROLLERS

flashcardApp.controller('splashController', ['$scope', function($scope) {

}]);

flashcardApp.controller('createController', ['$scope', function($scope) {

}]);

flashcardApp.controller('saveController', ['$scope', function($scope) {

}]);

flashcardApp.controller('studyController', ['$scope', function($scope) {

}]); 