var Critter = require("../critter/Critter");

CritterSerializer = function(){
  this.serialize = function(critter){
    return JSON.stringify(this.preserialize(critter));
  };
  
  this.preserialize = function(critter){
    return {
      vitals: critter.vitals,
      color: critter.color,
      direction: critter.direction,
      genes: critter.genes,
      location: critter.location,
      type: "critter"
    };
  };
  
  this.deserialize = function(critterJson){
    return new Critter(JSON.parse(critterJson));
  };
};

module.exports = CritterSerializer;