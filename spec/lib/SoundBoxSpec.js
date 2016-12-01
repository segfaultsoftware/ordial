describe("SoundBox", function(){
  var sound, soundBox, location, world;
  beforeEach(function(){
    world = singletonContext.world;
    soundBox = new SoundBox();
    sound = new Sound();
    location = {x: 3, y: 2};
  });

  describe("#makeFutureSound", function(){
    it("adds a sound to the sound box", function(){
      soundBox.makeFutureSound(sound, location);

      expect(soundBox.soundPlacements[0].sound).toBe(sound);
      expect(soundBox.soundPlacements[0].location).toEqual({x:3, y:2});
    });
  });

  describe("#applySoundsToWorld", function(){
    it("places the sounds in the world", function(){
      soundBox.makeFutureSound(sound, location);
      spyOn(world, 'place');

      soundBox.applySoundsToWorld();

      expect(world.place).toHaveBeenCalledWith(sound, location);
    });

    it("empties the sound box", function(){
      soundBox.makeFutureSound(sound, location);
      expect(soundBox.soundPlacements.length).toBe(1);
      soundBox.applySoundsToWorld();
      expect(soundBox.soundPlacements.length).toBe(0);
    });
  });

  describe("#silenceWorld", function(){
    it('removes the sounds from the world', function(){
      world.place(sound, {x:3, y:18});
      spyOn(world, 'remove');

      soundBox.silenceWorld();

      expect(world.remove).toHaveBeenCalledWith(sound);
    });

    it("does not remove rocks", function(){
      var rock = new Rock();
      world.place(rock, {x:3, y:18});
      spyOn(world, 'remove');

      soundBox.silenceWorld();

      expect(world.remove).not.toHaveBeenCalledWith(rock);
    });
  });
})