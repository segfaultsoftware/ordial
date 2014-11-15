describe("Critter that turns left if immovable object in front of it", function () {
  var world, rob, resource, blockingThing;
  beforeEach(function () {

    var isSomethingInFrontOfMe = function(senses) {
      return senses.thingInFrontOfMe;
    };
    var isThingInFrontOfMeEdible = function(senses) {
      return senses.thingInFrontOfMe instanceof Resource;
    };

    var turnLeftOrEatIt = new DecisionNode(isThingInFrontOfMeEdible, Critter.Actions.MOVE_FORWARD, Critter.Actions.TURN_LEFT);
    var moveForwardOrThink = new DecisionNode(isSomethingInFrontOfMe, turnLeftOrEatIt, Critter.Actions.MOVE_FORWARD);

    rob = new Critter({mind: new CritterMind({decisionTree: moveForwardOrThink})});
    blockingThing = {};
    resource = new Resource();
    world = new World();

    world.place(blockingThing, {x: 6, y: 0});
    world.place(resource, {x: 5, y: 1});
    world.place(rob, {x: 6, y:2});

  });
  it("should turn left at the wall then consume the resource", function () {
    world.update();
    expect(rob.location).toEqual({x:6, y:1});
    expect(rob.direction).toBe(CardinalDirection.NORTH);
    world.update();
    expect(rob.location).toEqual({x:6, y:1});
    expect(rob.direction).toBe(CardinalDirection.WEST);
    world.update();
    expect(rob.location).toEqual({x:5, y:1});
    world.update();

    expect(world.contains(resource)).toBeFalsy();
    expect(rob.location).toEqual({x:4, y:1});
    expect(rob.mana).toBe(Critter.DEFAULT_STARTING_MANA - 4 + Resource.DEFAULT_MANA_VALUE);
  });

});