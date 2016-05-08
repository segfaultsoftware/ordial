describe("Critter Mutation", function () {
  var world, rob;

  beforeEach(function () {
    world = singletonContext.world = new World();
    singletonContext.configuration.decompositionTime = 0;
  });

  describe("when a critter reproduces", function () {
    beforeEach(function () {
   //TODO: make this less fragile, more meaningful
window.singletonContext.randomNumberGenerator.stubRandom([0, 4, 0, 3, 0, 1, 1, 5, 1, 0.5, 1, 1, 3, 0, 0, 5, 3, 0.5 ]);

      var mindGenes = [['action', 'REPRODUCE']];
      Critter.DEFAULT_STARTING_MANA = Critter.Actions.REPRODUCE.cost;
      rob = new Critter({genes: mindGenes});
      world.place(rob, {x:3, y:3});
    });

    it("one child should have a mutation", function () {
      //rob reproduces and dies.
      world.update();
      expect(world.things.length).toBe(2);
      expect(world.contains(rob)).toBe(false);

      var mutantChild = world.getThingAt({x:4, y:3});
      var cloneChild = world.getThingAt({x:2, y:3});
      expect(mutantChild.direction).toEqual(CardinalDirection.EAST);

      //rob's clone child reproduces and dies
      //rob's mutant child turns left.
      world.update();
      expect(cloneChild).toBeDefined();
      expect(world.contains(cloneChild)).toBe(false);
      expect(mutantChild.direction).toEqual(CardinalDirection.NORTH);

      expect(world.things.length).toBe(3);
    });
  });
});
