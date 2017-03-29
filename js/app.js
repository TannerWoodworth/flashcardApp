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
	$scope.fileInput = document.getElementById('import');

	$scope.importFieldId = document.getElementById('import-area');
	$scope.importFieldContent;

	// TODO: Fix this garbage fire

	$scope.fileChanged = function(e) {
		$scope.file = $scope.fileInput.files;
		console.log($scope.file);
		$scope.fileReader = new FileReader();

		// $scope.fileReader.onload = function(e) {
		// 	console.log('FILEREADER');
		// 	console.log(e);
		// }
	}

	$scope.displayImport = function() {
		// $scope.importFieldId.style.display = 'block';
		console.info('displayImport CALLED');

		$scope.fileInput.onchange = function (e) {
			$scope.file = $scope.fileInput.files;
   		console.log($scope.file);
   		$scope.fileReader = new FileReader();

   		$scope.fileReader.onload = function(e) {
   			console.log('FILEREADER');
   			console.log(e);
   		}

   		// $scope.result = JSON.parse(e.target.result);
   		// $scope.string = JSON.stringify($scope.result, null, 2);
   		// console.log($scope.string);
		};
	}

	$scope.importCards = function(e) {

		if ($scope.file.length <= 0) {
	    return false;
	  }

		$scope.importableItems = $scope.importFieldContent.length;
		console.log('IMPORTED: ' + $scope.importFieldContent + ' # OF ITEMS: '+ $scope.importableItems);
	}

}]);

flashcardApp.controller('createController', ['$scope', 'cards', function($scope, cards) {

	$scope.currentFront = '';
	$scope.currentBack = '';
	$scope.editingCardId = '';
	$scope.savedCards = cards;
	$scope.editingCard = false;
	$scope.editingCardId;

	$scope.addNewCard = function() {

		// TODO: Clean up this garbage fire and try harder to break it

		if ($scope.editingCard === false){
			if ($scope.savedCards.length > 0) {
				$scope.cardId = $scope.savedCards.slice(-1)[0].id + 1
			} else {
				$scope.cardId = 0;
			}

			$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.cardId};

		} else {
			$scope.editingCard = false;
			cards.splice($scope.editingCardId, 1);
			$scope.newCard = {front: $scope.currentFront, back: $scope.currentBack, id: $scope.editingCardId};
			$scope.editingCardId = '';
		}

		$scope.savedCards.push($scope.newCard);
		$scope.currentFront = '';
		$scope.currentBack = '';
	};

	$scope.editCardFn = function(thisCardId) {
		$scope.editingCard = true;
		$scope.editingCardId = thisCardId;
		$scope.currentFront = $scope.savedCards[thisCardId].front;
		$scope.currentBack = $scope.savedCards[thisCardId].back;
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
		controller: 'splashController',
		scope: {
			cardObject: "=",
			editCardFn: "&"
		},
		link: function (scope, element, attributes) {

			scope.editCard = function(el) {
				scope.thisCard = el.cardObject.id;
        scope.editCardFn({thisCardId: scope.thisCard});
      };

		  scope.removeCard = function(el) {
				cards.splice(el, 1);
			};

    }
	}
}]);
