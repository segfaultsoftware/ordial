SoundBox = function(){
  this.soundPlacements = [];
  this.makeFutureSound = function(sound, location){
    this.soundPlacements.push({sound: sound, location:location});
  };

  this.applySoundsToWorld = function(){
    _.each(this.soundPlacements, function(placement){
      singletonContext.world.place(placement.sound, placement.location);
    });
    this.soundPlacements = [];
  };

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
};