var theDataBank = angular.module('theDataBank.controllers', ['ionic', 'ngResource'])

theDataBank.controller("MatchupCtrl", function($scope, PlayersV1, DamRecCalculator) {
  // all types are created as objects within an object and contain a
  // name, weaknesses, resistances, and immunities
  $scope.Players = PlayersV1.getPlayers();
  //initialized as empty because default type is not assigned
  var type1= "";
  var currentDRC=DamRecCalculator.emptyDRC();
  //create an object to lookup types by string name
  var lookup = PlayersV1.getLookUp();
  //function called when CALC button is pressed
  $scope.calculateAll = function(tName) {
    setType1(tName);
    DamRecCalculator.resetDRC($scope.Players, currentDRC);
    DamRecCalculator.calculateDRC(type1,$scope.Players, currentDRC);
    calculateWRI();
  };

  calculateWRI = function() {
    //initializes varies categories types could fall into
    var weaknesses  = []; var resistances = []; var neutralities  = [];
    for (var prop in currentDRC) {
      if (currentDRC[prop] == 2) {weaknesses.push(prop);}
      else if (currentDRC[prop] == 0.5) {resistances.push(prop);}
      else {neutralities.push(prop);};
    };
    //pushes variables to scope
    $scope.weaknesses  = weaknesses;
    $scope.resistances = resistances;
    $scope.neutralities  = neutralities;
  };
  setType1 = function(tName) {type1 = $scope.Players[lookup[tName]]};
  $scope.setPlayer = function(t1) {
    setType1(t1);
  };
})

theDataBank.controller("PlayersCtrl", function($scope, PlayersV1) {
  $scope.Players = PlayersV1.getPlayers();
})

theDataBank.controller("PlayerDetailCtrl", function($scope, $stateParams, PlayersV1, MovesV1) {
  $scope.playa = PlayersV1.getPlayer($stateParams.playa);
  $scope.Moves = MovesV1;
  // creates accordion list
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})


theDataBank.controller("MovesCtrl", function($scope, MovesV1) {
  $scope.Moves = MovesV1.getMoves();
})

theDataBank.controller("MoveDetailCtrl", function($scope, $stateParams, MovesV1) {
  $scope.move = MovesV1.getMove($stateParams.move);
  $scope.learnedBy = MovesV1.learnedBy($scope.move.id);
  $scope.numToWord = {0:'Zero', 1:'One', 2:'Two', 3:'Three', 4:'Four',
                      5:'Five', 6:'Six', 7:'Seven', 8:'Eight', 9:'Nine'}
})

theDataBank.controller("TypeCtrl", function($scope, $ionicSideMenuDelegate, $location) {
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.go = function ( path ) {
  $location.path( path );
  };
});
