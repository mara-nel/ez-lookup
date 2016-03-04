'use strict';
angular.module('theDataBank.services', ['ionic','ngResource'])

//shortcut for caste names
var  ZERO="Zero";var ONE="One";var TWO="Two";var THRE="Three";var FOUR="Four";
var FIVE="Five";var SIX="Six";var SEVN="Seven";var EIGH="Eight";var NINE="Nine";

// defining the movepools of each caste
var MP0 = [0,4,10,12,19]; var MP1 = [1,13,15,17,19]; var MP2 = [2,5,7];
var MP3 = [3,11,13,14,15,16,17,18,19]; var MP4 = [4,12,16,17]; var MP5 = [4,5,14];
var MP6 = [5,6,12,13]; var MP7 = [7,14,16]; var MP8 = [8,16,17]; var MP9 = [7,9,12];

var MOVEPOOLS = [MP0, MP1, MP2, MP3, MP4, MP5, MP6, MP7, MP8, MP9];

theDataBank.factory('DamRecCalculator', function() {
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

theDataBank.factory('PlayersV1', function() {

  var types = {
    zero: {name:  ZERO, weakTo:[FIVE],                          resists:[ONE,  THRE, FOUR, SEVN, NINE],
            role: {name:"Trapper", desc:"Leaving active position deals 1/4 damage for opponent"}, mvpl: MP0 },
    one:  {name:  ONE,  weakTo:[TWO,  SEVN, NINE],              resists:[ONE,  THRE, SIX],
            role: {name:"Sponge", desc:"Recovers 1/4 when hit by resisted move"},  mvpl: MP1 },
    two:  {name:  TWO,  weakTo:[ZERO, TWO,  FIVE, SIX],         resists:[ONE,  THRE, FOUR],
            role: {name:"Scout", desc:"Can switch immediately after attacking"}, mvpl:  MP2},
    thre: {name:  THRE, weakTo:[],                              resists:[ZERO, ONE,  TWO,  THRE, FOUR, FIVE, NINE],
            role: {name:"Medic", desc:"Fully heals whoever it replaces as active"}, mvpl: MP3 },
    four: {name:  FOUR, weakTo:[],                              resists:[],
            role: {name:"Waller", desc:"Recieves half damage when at full health"}, mvpl:  MP4},
    five: {name:  FIVE, weakTo:[TWO,  FIVE, SIX,  SEVN],        resists:[ONE,  THRE],
            role: {name:"Gurantee", desc:"Last attack hits even if knocked out"}, mvpl:  MP5},
    six:  {name:  SIX,  weakTo:[TWO,  FOUR, FIVE, SEVN],        resists:[ONE,  SIX,  NINE],
            role: {name:"Wild Card", desc:"Can learn three moves"}, mvpl: MP6 },
    sevn: {name:  SEVN, weakTo:[THRE, FOUR, SEVN, NINE],        resists:[ONE,  TWO,  SIX],
            role: {name:"Survivor", desc:"Recovers 1/8 at the end of every turn"}, mvpl: MP7 },
    eigh: {name:  EIGH, weakTo:[ONE,  FOUR, FIVE, SIX,  NINE],  resists:[THRE, FIVE, SEVN],
            role: {name:"Mixer", desc: "Recieved STAB is halved and non STAB is doubled"}, mvpl: MP8 },
    nine: {name:  NINE, weakTo:[ZERO, FOUR, SEVN],              resists:[FIVE, NINE],
            role: {name:"Heavy Hitter", desc: "Damage done is doubled if the same move was used last turn"}, mvpl: MP9 }
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
      return types[lookup[name]];
    },
    getLookUp: function() {
      return lookup;
    }
  };
})

theDataBank.factory('MovesV1', function() {

  var moves = {
    zero: {id:0,  name:ZERO+" Attack", desc:"Caste "+ZERO+"'s damaging attack"},
    one:  {id:1,  name:ONE +" Attack", desc:"Caste "+ONE +"'s damaging attack"},
    two:  {id:2,  name:TWO +" Attack", desc:"Caste "+TWO +"'s damaging attack"},
    thre: {id:3,  name:THRE+" Attack", desc:"Caste "+THRE+"'s damaging attack"},
    four: {id:4,  name:FOUR+" Attack", desc:"Caste "+FOUR+"'s damaging attack"},
    five: {id:5,  name:FIVE+" Attack", desc:"Caste "+FIVE+"'s damaging attack"},
    six:  {id:6,  name:SIX +" Attack", desc:"Caste "+SIX +"'s damaging attack"},
    sevn: {id:7,  name:SEVN+" Attack", desc:"Caste "+SEVN+"'s damaging attack"},
    eigh: {id:8,  name:EIGH+" Attack", desc:"Caste "+EIGH+"'s damaging attack"},
    nine: {id:9,  name:NINE+" Attack", desc:"Caste "+NINE+"'s damaging attack"},
    ten:  {id:10, name:"Drag Out",     desc:"The opponent's most recently relieved becomes their active"},
    elvn: {id:11, name:"Sacrifice",    desc:"Loses all remaining health in order to fully revive a teammate"},
    twlv: {id:12, name:"Pursuit",      desc:"Does 1/2 to recently relieved if switched this turn, else only 1/8"},
    thtn: {id:13, name:"Inversion",    desc:"Switches target's weaknesses and resistances, can target anyone"},
    frtn: {id:14, name:"Drain Spell",  desc:"Until opponent's active is relieved it takes 1/8 between turns"},
    fvtn: {id:15, name:"Fortify",      desc:"Target's neutrals become resistances, can target anyone"},
    sxtn: {id:16, name:"Absorb",       desc:"Deals 1/4 and heals 1/4"},
    svtn: {id:17, name:"Ignore",       desc:"Target's weaknesses become neutrals, can target anyone"},
    ehtn: {id:18, name:"Reset",        desc:"Resets every player's weaknesses, resistances, and neutrals"},
    nntn: {id:19, name:"Death Wish",   desc:"If user is killed from active damage then opponent's active is killed, always goes first"}
  }

  //object to lookup types by name
  var lookup = {};
  for (var prop in moves) {
      lookup[moves[prop].id] = prop;
  };

  return {
    getMoves: function() {
      return moves;
    },
    getMove: function(id) {
      return moves[lookup[id]];
    },
    learnedBy: function(mID) {
      var learnable = ['ab'];
      //because of ordering i happens to be the caste # being dealt with
      for (var i=0; i < MOVEPOOLS.length; i++) {
        if (MOVEPOOLS[i].indexOf(mID) > -1) {learnable.push(i);};
      };
      return learnable;
    }
  }
});
