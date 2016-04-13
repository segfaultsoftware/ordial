describe("Critter Death", function(){
  var world, critter;
  beforeEach(function () {
    world = singletonContext.world = new World();
    critter = new Critter({vitals: {mana: 1}});
    world.place(critter, {x: 1, y: 3});
  });
  
  describe("when a critter runs out of food", function(){
    it("dies, but its body remains for a bit.", function(){
      expect(critter.isDead()).toBeFalsy();
      
      for(var i = 0; i < singletonContext.configuration.decompositionTime; i++){
        world.update();
        expect(critter.isDead()).toBeTruthy();
        expect(world.contains(critter)).toBe(true);
      }

      world.update();
      
      expect(world.contains(critter)).toBe(false);
    });
  });
});