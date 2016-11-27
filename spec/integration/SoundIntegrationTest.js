describe("Sound", function(){
  describe("when one critter makes a sound", function(){
    var world, rob, harry;
    beforeEach(function () {
      world = singletonContext.world = new World();
      var makeSound = [['condition', 'counterUnder1'],['action', ['MAKE_SOUND', 'INCREMENT_COUNTER']]];
      rob = new Critter({genes: makeSound});

      var turnWhenSound = [['condition', 'soundInFront'], ['action', 'TURN_RIGHT']];
      harry = new Critter({genes: turnWhenSound});

      world.place(harry, {x:2, y:4});
      world.place(rob, {x: 2, y:2});
    });

    it("another critter can react to the sound on the next update", function(){
      //TODO: SOUND should be both placed and removed between rather than during critter update cycles

      world.update();
      expect(harry.direction).toBe(CardinalDirection.NORTH);

      world.update();

      expect(harry.direction).toBe(CardinalDirection.EAST);
    });
  });
});