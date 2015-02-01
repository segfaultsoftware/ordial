describe("Critters taking multiple actions per world tick", function () {
  var world, fred;

  beforeEach(function() {
    world = new World();
  });

  describe("when a critter has multiple actions in an action node", function () {
    beforeEach(function () {
      var moveForwardThenTurnLeft = [Critter.Actions.MOVE_FORWARD, Critter.Actions.TURN_LEFT];
      fred = new Critter({mind: new CritterMind({decisionTree: moveForwardThenTurnLeft})});

      world.place(fred, {x: 5, y: 5});
    });

    it("executes both per world update", function () {
      world.update();
      expect(fred.location).toEqual({x: 5, y: 4});
      expect(fred.direction).toBe(CardinalDirection.WEST);
    });
  });

  describe("when a critter has one action in an action node", function () {
    beforeEach(function () {
      var moveForward = Critter.Actions.MOVE_FORWARD;
      fred = new Critter({mind: new CritterMind({decisionTree: moveForward})});

      world.place(fred, {x: 5, y: 5});
    });

    it("executes only that one action per world update", function () {
      world.update();
      expect(fred.location).toEqual({x: 5, y: 4});
      expect(fred.direction).toBe(CardinalDirection.NORTH);
    });
  });
});