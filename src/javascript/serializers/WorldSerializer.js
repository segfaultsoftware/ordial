var WorldSerializer = function(){
  this.serialize = function(world){
    var preserializedThings = _.map(world.things, function(thing){
      var result = { location: thing.location };
      if(thing instanceof Rock){
        result.type = "rock";
      } else if (thing instanceof Resource){
        result.type = "resource";
      } else if(thing instanceof Critter){
        result = singletonContext.critterSerializer.preserialize(thing);
      } else {
        console.error("cannot serialize unknown type: " + thing);
      }
      return result;
    });
    return JSON.stringify({
      width: world.width,
      height: world.height,
      things: preserializedThings
    });
  };
};