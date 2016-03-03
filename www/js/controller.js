var typeCalculator = angular.module('typeCalculator.controllers', ['ionic', 'ngResource'])

typeCalculator.controller("Gen6Ctrl", function($scope, Types6, DamRecCalculator) {
  // all types are created as objects within an object and contain a
  // name, weaknesses, resistances, and immunities
  $scope.Types = Types6.getTypes();

  //initialized as empty because default type is not assigned
  var type1= "";
  var type2= "";
  var currentDRC=DamRecCalculator.emptyDRC();

  //create an object to lookup types by string name
  var lookup = Types6.getLookUp();

  //function called when CALC button is pressed
  $scope.calculateAll = function(tName1,tName2) {
    setType1(tName1);
    setType2(tName2);
    DamRecCalculator.resetDRC($scope.Types, currentDRC);
    DamRecCalculator.calculateDRC(type1,$scope.Types, currentDRC);
    DamRecCalculator.calculateDRC(type2,$scope.Types, currentDRC);
    calculateWRI();
  };

  calculateWRI = function() {
    //initializes varies categories types could fall into
    var weaknesses  = []; var resistances = []; var immunities  = [];
    var veryWeak    = []; var veryResist  = [];

    for (var prop in currentDRC) {
      if (currentDRC[prop] == 2) {weaknesses.push(prop);}
      else if (currentDRC[prop] == 0.5) {resistances.push(prop);}
      else if (currentDRC[prop] == 0) {immunities.push(prop);}
      else if (currentDRC[prop] == 4) {veryWeak.push(prop);}
      else if (currentDRC[prop] == 0.25) {veryResist.push(prop);};
    };
    //pushes variables to scope
    $scope.weaknesses  = weaknesses;
    $scope.resistances = resistances;
    $scope.immunities  = immunities;
    $scope.veryWeak    = veryWeak;
    $scope.veryResist  = veryResist;
  };

  setType1 = function(tName) {type1 = $scope.Types[lookup[tName]]};
  setType2 = function(tName) {type2 = $scope.Types[lookup[tName]]};
  $scope.setTypes = function(t1,t2) {
    setType1(t1);
    setType2(t2);
  };
})


typeCalculator.controller("Gen1Ctrl", function($scope, Types1, DamRecCalculator) {
  // all types are created as objects with a name and lists of weaknesses,
  // resistances, and immunities
  $scope.Types = Types1.getTypes();

  //initialized as empty because default type is not assigned
  var type1= "";
  var type2= "";
  var currentDRC=DamRecCalculator.emptyDRC();

  //create an object to lookup types by string name
  var lookup = Types1.getLookUp();

  /*var lookup = {};
  for (var prop in $scope.Types) {
      lookup[$scope.Types[prop].name] = prop;
  };*/

  $scope.calculateAll = function(tName1,tName2) {
    setType1(tName1);
    setType2(tName2);
    DamRecCalculator.resetDRC($scope.Types, currentDRC);
    DamRecCalculator.calculateDRC(type1,$scope.Types, currentDRC);
    DamRecCalculator.calculateDRC(type2,$scope.Types, currentDRC);
    calculateWRI();
  };

  calculateWRI = function() {
    //initializes varies categories types could fall into
    var weaknesses  = []; var resistances = []; var immunities  = [];
    var veryWeak    = []; var veryResist  = [];

    for (var prop in currentDRC) {
      if (currentDRC[prop] == 2) {weaknesses.push(prop);}
      else if (currentDRC[prop] == 0.5) {resistances.push(prop);}
      else if (currentDRC[prop] == 0) {immunities.push(prop);}
      else if (currentDRC[prop] == 4) {veryWeak.push(prop);}
      else if (currentDRC[prop] == 0.25) {veryResist.push(prop);};
    };
    //pushes variables to scope
    $scope.weaknesses  = weaknesses;
    $scope.resistances = resistances;
    $scope.immunities  = immunities;
    $scope.veryWeak    = veryWeak;
    $scope.veryResist  = veryResist;
  };

  setType1 = function(tName) {type1 = $scope.Types[lookup[tName]]};
  setType2 = function(tName) {type2 = $scope.Types[lookup[tName]]};
  $scope.setTypes = function(t1,t2) {
    setType1(t1);
    setType2(t2);
  };
})


typeCalculator.controller("TypeCtrl", function($scope, $ionicSideMenuDelegate, $location) {
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.go = function ( path ) {
  $location.path( path );
  };
});
