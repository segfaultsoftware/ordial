describe("SoundSilencer", function(){
  var silencer;
  beforeEach(function(){
    silencer = new SoundSilencer();
  });
  describe("#silenceWorld", function(){
    var world, sound, rock;
    beforeEach(function(){
      world = window.singletonContext.world;
      sound = new Sound();
      world.place(sound, {x: 0, y:0});
      rock = new Rock();
      world.place(rock, {x: 0, y:0});
    });

    it("removes all sounds from the world", function(){
      silencer.silenceWorld();
      expect(world.contains(sound)).toBe(false);
    });

    it("does not remove rocks", function(){
      silencer.silenceWorld();

      expect(world.contains(rock)).toBe(true);
    });
  });
});