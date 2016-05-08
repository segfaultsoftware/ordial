describe("Critteria Death", function(){
  var world, critter;
  beforeEach(function () {
    world = singletonContext.world = new World();
    critter = new Critter({vitals: {mana: 1}});
    world.place(critter, {x: 1, y: 0});
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
    
    it("another critter can eat the corpse", function(){
      var rex = new Critter({vitals: {mana: 300}, genes: [['action', 'MOVE_FORWARD_AND_EAT_CRITTER']]});
      world.place(rex, {x: 1, y: 1});
      world.update();
      expect(world.contains(critter)).toBe(false);
      expect(rex.vitals.mana).toBeGreaterThan(300);
    });
  });
});

