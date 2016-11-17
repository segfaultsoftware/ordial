SoundSilencer = function(){
  this.silenceWorld = function(){
    var world = singletonContext.world;
    world.things.forEach(function(thing){
      if(thing instanceof Sound){
        world.remove(thing);
      }
    });
  }
}