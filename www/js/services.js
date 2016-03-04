'use strict';
angular.module('theDataBank.services', ['ionic','ngResource'])

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

.factory('PlayersV1', function() {
  //creating symbolic constants for types
  var  ZERO="Zero";var ONE="One";var TWO="Two";var THRE="Three";var FOUR="Four";
  var FIVE="Five";var SIX="Six";var SEVN="Seven";var EIGH="Eight";var NINE="Nine";

  var types = {
    zero: {name:ZERO, weakTo:[FIVE],                          resists:[ONE,  THRE, FOUR, SEVN, NINE],
            role: {name:"Trapper", desc:"Leaving active position deals 1/4 damage for opponent"} },
    one:  {name:ONE,  weakTo:[TWO,  SEVN, NINE],              resists:[ONE,  THRE, SIX],
            role: {name:"Sponge", desc:"Recovers 1/4 when hit by resisted move"} },
    two:  {name:TWO,  weakTo:[ZERO, TWO,  FIVE, SIX],         resists:[ONE,  THRE, FOUR],
            role: {name:"Scout", desc:"Can switch immediately after attacking"} },
    thre: {name:THRE, weakTo:[],                              resists:[ZERO, ONE,  TWO,  THRE, FOUR, FIVE, NINE],
            role: {name:"Medic", desc:"Fully heals whoever it replaces as active"} },
    four: {name:FOUR, weakTo:[],                              resists:[],
            role: {name:"Waller", desc:"Recieves half damage when at full health"} },
    five: {name:FIVE, weakTo:[TWO,  FIVE, SIX,  SEVN],        resists:[ONE,  THRE],
            role: {name:"Gurantee", desc:"Last attack hits even if knocked out"} },
    six:  {name:SIX,  weakTo:[TWO,  FOUR, FIVE, SEVN],        resists:[ONE,  SIX,  NINE],
            role: {name:"Wild Card", desc:"Can learn three moves"} },
    sevn: {name:SEVN, weakTo:[THRE, FOUR, SEVN, NINE],        resists:[ONE,  TWO,  SIX],
            role: {name:"Survivor", desc:"Recovers 1//8 at the end of every turn"} },
    eigh: {name:EIGH, weakTo:[ONE,  FOUR, FIVE, SIX,  NINE],  resists:[THRE, FIVE, SEVN],
            role: {name:"Mixer", desc: "Recieved STAB is halved and non STAB is doubled"}, },
    nine: {name:NINE, weakTo:[ZERO, FOUR, SEVN],              resists:[FIVE, NINE],
            role: {name:"Heavy Hitter", desc: "Outputted damage is doubled if the same move was used last turn"}, }
    }
  //object to lookup types by name
  var lookup = {};
  for (var prop in types) {
      lookup[types[prop].name] = prop;
  };

  return {
    getPlayers: function() {
      return types;
    },
    getPlayer: function(name) {
      //return lookup[name];
      return types[lookup[name]];
      //return types.zero;
    },
    getLookUp: function() {
      return lookup;
    }
  };
})

.factory('MovesV1', function() {

});
