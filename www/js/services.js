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
  var isInImm= function(t1,t2,typeList) {
    var index = 0;
    index = t1.immuneTo.indexOf(typeList[t2].name);
    if (index != -1) {return true;}
    else{return false;}; };
  //helper function to set DamageRecievedCalculator appropriately
  var isWeak = function(t1,typeList,drc) {drc[typeList[t1].name] *= 2.0;};
  var isRes  = function(t1,typeList,drc) {drc[typeList[t1].name] *= 0.5;};
  var isImm  = function(t1,typeList,drc) {drc[typeList[t1].name] *= 0;};
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
          else if (isInImm(tObj1,prop,typeList) == true) {isImm(prop,typeList,drc);}
          else {isNeu(prop,typeList,drc);};
        };
      };
    }
  }
})

.factory('Types6', function() {
  //creating symbolic constants for types
  var  BUG="Bug";var DARK="Dark";var DRAG="Dragon";var ELEC="Electric";var FAIR="Fairy";
  var FIGH="Fighting";var FIRE="Fire";var FLY="Flying";var GHOS="Ghost";var GRAS="Grass";
  var GROU="Ground";var ICE="Ice"; var NORM="Normal";var POIS="Poison";var PSYC="Psychic";
  var ROCK="Rock";var STEE="Steel";var WATE="Water";

  var types = {
    bug:  {name:BUG,  weakTo:[FIRE,FLY,ROCK],            resists:[FIGH,GRAS,GROU],      immuneTo:[] },
    dark: {name:DARK, weakTo:[BUG,FIGH,FAIR],            resists:[DARK,GHOS],           immuneTo:[PSYC] },
    drag: {name:DRAG, weakTo:[DRAG,ICE,FAIR],            resists:[ELEC,FIRE,GRAS,WATE], immuneTo:[] },
    elec: {name:ELEC, weakTo:[GROU],                     resists:[ELEC,FLY,STEE],       immuneTo:[] },
    fair: {name:FAIR, weakTo:[POIS,STEE],                resists:[BUG,DARK,FIGH],       immuneTo:[DRAG] },
    figh: {name:FIGH, weakTo:[FAIR,FLY,PSYC],            resists:[BUG,DARK,ROCK],       immuneTo:[] },
    fire: {name:FIRE, weakTo:[GROU,ROCK,WATE],           resists:[BUG,FAIR,FIRE,GRAS,ICE,STEE], immuneTo:[] },
    fly:  {name:FLY,  weakTo:[ELEC,ICE,ROCK],            resists:[BUG,FIGH,GRAS],       immuneTo:[GROU] },
    ghos: {name:GHOS, weakTo:[DARK,GHOS],                resists:[BUG,POIS],            immuneTo:[FIGH, NORM ] },
    gras: {name:GRAS, weakTo:[BUG,FIRE,FLY,ICE,POIS],    resists:[ELEC,GRAS,GROU,WATE], immuneTo:[] },
    grou: {name:GROU, weakTo:[GRAS,ICE,WATE],            resists:[POIS,ROCK],           immuneTo:[ELEC] },
    ice:  {name:ICE,  weakTo:[FIGH,FIRE,ROCK,STEE],      resists:[ICE],                 immuneTo:[] },
    norm: {name:NORM, weakTo:[FIGH],                     resists:[],                    immuneTo:[GHOS] },
    pois: {name:POIS, weakTo:[GROU,PSYC],                resists:[BUG,FAIR,FIGH,GRAS,POIS], immuneTo:[] },
    psyc: {name:PSYC, weakTo:[BUG,DARK,GHOS],            resists:[FIGH,PSYC],           immuneTo:[] },
    rock: {name:ROCK, weakTo:[FIGH,GRAS,GROU,STEE,WATE], resists:[FIRE,FLY,NORM,POIS],  immuneTo:[] },
    stee: {name:STEE, weakTo:[FIGH,FIRE,GROU],           resists:[BUG,DRAG,FAIR,FLY,GRAS,ICE,NORM,PSYC,ROCK,STEE], immuneTo:[POIS] },
    wate: {name:WATE, weakTo:[ELEC,GRAS],                resists:[FIRE,ICE,STEE,WATE],  immuneTo:[] },
  };

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
})

.factory('Types1', function() {
  //creating symbolic constants for types
  var BUG="Bug";var DRAG="Dragon";var ELEC="Electric";var FIGH="Fighting";var FIRE="Fire";
  var FLY="Flying";var GHOS="Ghost";var GRAS="Grass";var GROU="Ground";var ICE="Ice";
  var NORM="Normal";var POIS="Poison";var PSYC="Psychic";var ROCK="Rock";var WATE="Water";

  var types = {
    bug:  {name:BUG,  weakTo:[POIS,FIRE,FLY,ROCK],    resists:[FIGH,GRAS,GROU],      immuneTo:[] },
    drag: {name:DRAG, weakTo:[DRAG,ICE],              resists:[ELEC,FIRE,GRAS,WATE], immuneTo:[] },
    elec: {name:ELEC, weakTo:[GROU],                  resists:[ELEC,FLY],            immuneTo:[] },
    figh: {name:FIGH, weakTo:[FLY,PSYC],              resists:[BUG,ROCK],            immuneTo:[] },
    fire: {name:FIRE, weakTo:[GROU,ROCK,WATE],        resists:[BUG,FIRE,GRAS],       immuneTo:[] },
    fly:  {name:FLY,  weakTo:[ELEC,ICE,ROCK],         resists:[BUG,FIGH,GRAS],       immuneTo:[GROU] },
    ghos: {name:GHOS, weakTo:[GHOS],                  resists:[POIS],                immuneTo:[FIGH, NORM ] },
    gras: {name:GRAS, weakTo:[BUG,FIRE,FLY,ICE,POIS], resists:[ELEC,GRAS,GROU,WATE], immuneTo:[] },
    grou: {name:GROU, weakTo:[GRAS,ICE,WATE],         resists:[POIS,ROCK],           immuneTo:[ELEC] },
    ice:  {name:ICE,  weakTo:[FIGH,FIRE,ROCK],        resists:[ICE],                 immuneTo:[] },
    norm: {name:NORM, weakTo:[FIGH],                  resists:[],                    immuneTo:[GHOS] },
    pois: {name:POIS, weakTo:[GROU,PSYC,BUG],         resists:[FIGH,GRAS,POIS],      immuneTo:[] },
    psyc: {name:PSYC, weakTo:[BUG],                   resists:[FIGH,PSYC],           immuneTo:[GHOS] },
    rock: {name:ROCK, weakTo:[FIGH,GRAS,GROU,WATE],   resists:[FIRE,FLY,NORM,POIS],  immuneTo:[] },
    wate: {name:WATE, weakTo:[ELEC,GRAS],             resists:[FIRE,ICE,WATE],       immuneTo:[] }
  };

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
})
