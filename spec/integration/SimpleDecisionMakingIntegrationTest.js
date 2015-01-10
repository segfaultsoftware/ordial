describe("Simple Decision Making", function () {
  describe("Avoiding obstacles", function () {
    var world, rob, resource, blockingThing;

    beforeEach(function () {
      var isSomethingInFrontOfMe = function(stimuli) {
        return stimuli.thingInFrontOfMe;
      };
      var isThingInFrontOfMeEdible = function(stimuli) {
        return stimuli.thingInFrontOfMe instanceof Resource;
      };

      var turnLeftOrEatIt = new DecisionNode(isThingInFrontOfMeEdible, Critter.Actions.MOVE_FORWARD, Critter.Actions.TURN_LEFT);
      var moveForwardOrThink = new DecisionNode(isSomethingInFrontOfMe, turnLeftOrEatIt, Critter.Actions.MOVE_FORWARD);

      rob = new Critter({mind: new CritterMind({decisionTree: moveForwardOrThink})});
      blockingThing = new Rock();
      resource = new Resource();
      world = new World();

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

      expect(rob.mana).toBe(Critter.DEFAULT_STARTING_MANA - 7 + Resource.DEFAULT_MANA_VALUE);
    });
  });
});
