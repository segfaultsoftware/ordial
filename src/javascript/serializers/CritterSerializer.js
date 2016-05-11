var CritterSerializer = function(){
  this.serialize = function(critter){
    return JSON.stringify({
      vitals: critter.vitals,
      color: critter.color,
      direction: critter.direction,
      genes: critter.genes
    });
  };
  
  this.deserialize = function(critterJson){
    return new Critter(JSON.parse(critterJson));
  };
};