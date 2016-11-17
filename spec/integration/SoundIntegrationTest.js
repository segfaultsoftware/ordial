describe("Sound", function(){
  describe("when one critter makes a sound", function(){
    var world, rob, harry;
    beforeEach(function () {
      world = singletonContext.world = new World();
      var makeSound = [['action', ['MAKE_SOUND']]];
      rob = new Critter({genes: makeSound});

      var turnWhenSound = [['condition', 'soundInFront'], ['action', 'TURN_RIGHT']];
      harry = new Critter({genes: turnWhenSound});

      world.place(harry, {x:2, y:4});
      world.place(rob, {x: 2, y:2});
    });

    it("another critter can react to the sound", function(){
      //TODO: SOUND should be both placed and removed between rather than during critter update cycles
      // this test currently fails about half the time.
      world.update();
      expect(harry.direction).toBe(CardinalDirection.EAST);
    });
  });
});