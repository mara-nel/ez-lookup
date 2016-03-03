'use strict';
angular.module('typeCalculator.services', ['ionic','ngResource'])

.factory('DamRecCalculator', function() {
  //helper functions to see if a given type is in another types W/R/I's
  var isInWeak= function(t1,t2,typeList) {
    var index = 0;
    index = t1.weakTo.indexOf(typeList[t2].name);
    if (index != -1) {return true;}
    else{return false;}; };
  var isInRes= function(t1,t2,typeList) {
    var index = 0;
    index = t1.resists.indexOf(typeList[t2].name);
    if (index != -1) {return true;}
    else{return false;}; };

  //helper function to set DamageRecievedCalculator appropriately
  var isWeak = function(t1,typeList,drc) {drc[typeList[t1].name] *= 2.0;};
  var isRes  = function(t1,typeList,drc) {drc[typeList[t1].name] *= 0.5;};
  var isNeu  = function(t1,typeList,drc) {drc[typeList[t1].name] *= 1.0;};

  return {
    emptyDRC: function() {
      return {}
    },
    resetDRC: function(typeList, drc) {
      for (var prop in typeList) {
          drc[typeList[prop].name] = 1.0;
      }
    },
    calculateDRC: function(tObj1,typeList,drc) {
      if(typeof tObj1 === 'undefined'){} else {
        for (var prop in typeList) {
          if (isInWeak(tObj1,prop,typeList) == true) {isWeak(prop,typeList,drc);}
          else if (isInRes(tObj1,prop,typeList) == true) {isRes(prop,typeList,drc);}
          else {isNeu(prop,typeList,drc);};
        };
      };
    }
  }
  })

.factory('Types6', function() {
  //creating symbolic constants for types
  var  ZERO="Zero";var ONE="One";var TWO="Two";var THRE="Three";var FOUR="Four";
  var FIVE="Five";var SIX="Six";var SEVN="Seven";var EIGH="Eight";var NINE="Nine";


  var types = {
    zero: {name:ZERO, weakTo:[FIVE],                          resists:[ONE,  THRE, FOUR, SEVN, NINE] },
    one:  {name:ONE,  weakTo:[TWO,  SEVN, NINE],              resists:[ONE,  THRE, SIX] },
    two:  {name:TWO,  weakTo:[ZERO, TWO,  FIVE, SIX],         resists:[ONE,  THRE, FOUR] },
    thre: {name:THRE, weakTo:[],                              resists:[ZERO, ONE,  TWO,  THRE, FOUR, FIVE, NINE] },
    four: {name:FOUR, weakTo:[],                              resists:[] },
    five: {name:FIVE, weakTo:[TWO,  FIVE, SIX,  SEVN],        resists:[ONE,  THRE] },
    six:  {name:SIX,  weakTo:[TWO,  FOUR, FIVE, SEVN],        resists:[ONE,  SIX,  NINE] },
    sevn: {name:SEVN, weakTo:[THRE, FOUR, SEVN, NINE],        resists:[ONE,  TWO,  SIX] },
    eigh: {name:EIGH, weakTo:[ONE,  FOUR, FIVE, SIX,  NINE],  resists:[THRE, FIVE, SEVN] },
    nine: {name:NINE, weakTo:[ZERO, FOUR, SEVN],              resists:[FIVE, NINE] }
    }
  

  //object to lookup types by name
  var lookup = {};
  for (var prop in types) {
      lookup[types[prop].name] = prop;
  };

  return {
    getTypes: function() {
      return types;
    },
    getType: function(typeId) {
      return types.typeId;
    },
    getLookUp: function() {
      return lookup;
    }
  }
});
