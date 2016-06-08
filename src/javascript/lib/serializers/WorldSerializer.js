WorldSerializer = function(){
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
  
  this.deserialize = function(serializedWorld, targetWorld){
    var pojoWorld = JSON.parse(serializedWorld);
    if(targetWorld){
      targetWorld.initialize();
    }
    var world = targetWorld || new World();
    _.each(pojoWorld.things, function(pojoThing){
      var thing;

      switch(pojoThing.type) {
        case "rock":
          thing = new Rock();
          break;
        case "critter":
          thing = new Critter(pojoThing);
          break;
        case "resource":
          thing = new Resource();
          break;
        default:
          console.error("failed to deserialize item of type:" + pojoThing.type);
          break;
      }
      world.place(thing, pojoThing.location);    
    });
    
    return world;
  };
};