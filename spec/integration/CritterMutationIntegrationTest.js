describe("Critter Mutation", function () {
  var world, rob;

  beforeEach(function () {
    world = singletonContext.world = new World();
  });

  describe("when a critter reproduces", function () {
    var resource, blockingThing;

    beforeEach(function () {
      Math.seedrandom(1);
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
