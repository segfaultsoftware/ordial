var CardinalDirection = require("../../src/javascript/lib/models/CardinalDirection")
describe("Critter Mutation", function () {
  var world, rob;

  beforeEach(function () {
    world = singletonContext.world = new World();
    singletonContext.configuration.decompositionTime = 0;
  });

  describe("when a critter reproduces", function () {
    beforeEach(function () {
      singletonContext.randomNumberGenerator.stubRandom(stubRandomScript());

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

  function stubRandomScript() {
    return [
      0, // color in Critter initializer
      4, // mutate method in GeneMutator
      0, // subMutate method in GeneMutator
      3, // mutate method in SubMutator
      0, // replace method in SubMutator
      1, // randomAction method in SubMutator
      1, // reproduceCritter in CritterActuator
      5, // color in Critter initializer
      0.5, // spawn for ResourceSpawner
      1, // mutate in GeneMutator
      1, // randomGene in GeneMutator
      3, // randomAction in GeneMutator
      0, // insert in GeneMutator
      0, // reproduceCritter in CritterActuator
      5, // color in Critter initializer
      0.5 // spawn for ResourceSpawner
    ];
  }
});
