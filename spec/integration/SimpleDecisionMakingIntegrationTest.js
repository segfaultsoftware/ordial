describe("Simple Decision Making", function () {
  var world, rob;

  beforeEach(function () {
    world = singletonContext.world = new World();
  });

  describe("with forward stimuli", function () {
    var resource, blockingThing;

    beforeEach(function () {
      var moveForwardOrEatOrTurn = [['condition', 'thingInFront'], ['condition', 'resourceInFront'], ['action', 'MOVE_FORWARD'], ['action', 'MOVE_FORWARD'], ['action', 'TURN_LEFT']];

      var mind = new MindFactory().create(moveForwardOrEatOrTurn);
      rob = new Critter({mind: mind});
      blockingThing = new Rock();
      resource = new Resource();

      world.place(blockingThing, {x: 3, y: 0});
      world.place(resource, {x: 2, y: 1});
      world.place(rob, {x: 3, y:2});
    });

    it("should turn left at the wall then consume the resource", function () {
      world.update();
      expect(rob.location).toEqual({x:3, y:1});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      world.update();
      expect(rob.location).toEqual({x:3, y:1});
      expect(rob.direction).toBe(CardinalDirection.WEST);
      world.update();
      expect(rob.location).toEqual({x:2, y:1});
      world.update();
      expect(world.contains(resource)).toBeFalsy();
      expect(rob.location).toEqual({x:1, y:1});
      world.update();
      expect(rob.location).toEqual({x:0, y:1});
      world.update();
      expect(rob.location).toEqual({x:0, y:1});
      expect(rob.direction).toBe(CardinalDirection.SOUTH);
      world.update();
      expect(rob.location).toEqual({x:0, y:2});

      expect(rob.vitals.mana).toBe(Critter.DEFAULT_STARTING_MANA - 7 + Resource.DEFAULT_MANA_VALUE);
    });
  });

  describe("with stimuli from all directions", function () {
    beforeEach(function () {
      world.place(new Rock(), {x: 2, y: 0});
      world.place(new Rock(), {x: 4, y: 0});
      world.place(new Rock(), {x: 2, y: 1});
      world.place(new Rock(), {x: 1, y: 2});
      world.place(new Rock(), {x: 1, y: 3});
      world.place(new Rock(), {x: 4, y: 2});
      world.place(new Rock(), {x: 3, y: 3});


      var mindGenes = [['condition', 'thingInFront'], 
          ['condition', 'thingToTheLeft'], ['action', 'MOVE_FORWARD'], ['condition','thingToTheRight'], ['action', 'TURN_LEFT'], null, null, ['action', 'STARE_OFF_INTO_SPACE'], ['action', 'TURN_RIGHT']];
      
      complexMind = new MindFactory().create(mindGenes);
      rob = new Critter({mind: complexMind});
      world.place(rob, {x: 2, y: 3});
    });

    it("get to the other side with minimum energy spent", function () {
      world.update();
      expect(rob.location).toEqual({x: 2, y: 2});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      world.update();
      expect(rob.location).toEqual({x: 2, y: 2});
      expect(rob.direction).toBe(CardinalDirection.EAST);
      world.update();
      expect(rob.location).toEqual({x: 3, y: 2});
      expect(rob.direction).toBe(CardinalDirection.EAST);
      world.update();
      expect(rob.location).toEqual({x: 3, y: 2});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      world.update();
      expect(rob.location).toEqual({x: 3, y: 1});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      world.update();
      expect(rob.location).toEqual({x: 3, y: 0});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      world.update();
      expect(rob.location).toEqual({x: 3, y: 0});
      expect(rob.direction).toBe(CardinalDirection.NORTH);
    });
  });
});
