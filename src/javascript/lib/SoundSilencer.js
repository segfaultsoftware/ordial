SoundSilencer = function(){
  this.silenceWorld = function(){
    var world = singletonContext.world;
    var sounds = [];
    world.things.forEach(function(thing){
      if(thing instanceof Sound){
        sounds.push(thing);
      }
    });
    sounds.forEach(function(sound){
      world.remove(sound);
    });
  }
}