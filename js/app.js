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
	$scope.editingCardId = '';
	$scope.savedCards = cards;

	$scope.addNewCard = function() {

		if ($scope.savedCards.length > 0) {
			// exists
			$scope.cardId = $scope.savedCards.slice(-1)[0].id + 1
			console.info('cardId SET TO: ' + $scope.cardId);
		} else {
			console.info('cardId SET TO 0');
			$scope.cardId = 0;
		}

		$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.cardId};
		$scope.savedCards.push($scope.newCard);

		$scope.currentFront = '';
		$scope.currentBack = '';
	};

	$scope.editThisCardFn = function(thisId, thisFront, thisBack) {
		$scope.editingCardId = thisId;
		console.log('id: ' + thisId + ' front: ' + thisFront + ' front: ' + thisBack);
		$scope.currentFront = thisFront;
		$scope.currentBack = thisBack;
	};

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
	$scope.currentCard = 0;

	$scope.nextCard = function() {

		if ($scope.currentCard < $scope.cardStackSize) {
			$scope.currentCard = $scope.currentCard + 1;
			$scope.currentCardText = $scope.savedCards[$scope.currentCard].front;
		} else {
			// Go to first card
			$scope.currentCard = 0;
			$scope.currentCardText = $scope.savedCards[0].front;
		}

		$scope.currentCardside = 0;
	}

	$scope.previousCard = function() {

		if ($scope.currentCard === 0) {
			$scope.currentCard = $scope.cardStackSize;
			$scope.currentCardText = $scope.savedCards[$scope.currentCard].front;
		} else {
			$scope.currentCard = $scope.currentCard - 1;
			$scope.currentCardText = $scope.savedCards[$scope.currentCard].front;
		}

		$scope.currentCardside = 0;
	}

	$scope.flipCard = function() {

		if ($scope.currentCardside === 0) {
			// Back
			$scope.currentCardside = 1
			$scope.currentCardText = $scope.savedCards[$scope.currentCard].back;
		} else {
			// Front
			$scope.currentCardside = 0
			$scope.currentCardText = $scope.savedCards[$scope.currentCard].front;
		}
	}

}]); 

// DIRECTIVES
/////////////////////////////////////////////////

flashcardApp.directive("finishedCard", ['cards', function(cards) {
	return {
		templateUrl: 'directives/finishedCard.html',
		replace: false,
		scope: {
			cardObject: "="
		},
		link: function (scope, element, attributes) {

		  scope.removeCard = function(el) {
		  	scope.thisCard = el.cardObject.id;
				cards.splice(scope.thisCard, 1);
			}

			scope.editCard = function(el) {
				scope.thisCard = el.cardObject.id;
				console.log('EDITING CARD: ' + scope.thisCard);
				scope.currentFront = el.cardObject.front;
				scope.currentBack = el.cardObject.back;
				console.log('Front: ' + el.cardObject.front);
				// TODO: write something to pass this info to the create controller and call editThisCardFn function

				// scope.editThisCardFn(el.cardObject.id, el.cardObject.front, el.cardObject.back);
			}
    }
	}
}]);
