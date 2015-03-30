describe("Simple Decision Making", function () {
  var world, rob;

  beforeEach(function () {
    world = singletonContext.world = new World();
  });

  describe("with forward stimuli", function () {
    var resource, blockingThing;

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

      var isSomethingInFrontOfMe = function(stimuli) {
        return stimuli.thingInFrontOfMe;
      };
      var isSomethingToTheLeftOfMe = function(stimuli) {
        return stimuli.thingToTheLeftOfMe;
      };
      var isSomethingToTheRightOfMe = function(stimuli) {
        return stimuli.thingToTheRightOfMe;
      };

      var turnLeftOrStayStill = new DecisionNode(isSomethingToTheLeftOfMe, Critter.Actions.STARE_OFF_INTO_SPACE, Critter.Actions.TURN_LEFT);
      var turnLeftRightOrThink = new DecisionNode(isSomethingToTheRightOfMe, turnLeftOrStayStill, Critter.Actions.TURN_RIGHT);
      var moveForwardOrThink = new DecisionNode(isSomethingInFrontOfMe, turnLeftRightOrThink, Critter.Actions.MOVE_FORWARD);
      var complexMind = new CritterMind({decisionTree: moveForwardOrThink});

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
