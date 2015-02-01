describe("Decision making from memory", function () {
  var world;
  describe("when a critter wants to do something different every turn", function () {
    var anna;
    beforeEach(function () {
      world = new World();

      var zig = [Critter.Actions.TURN_RIGHT, Critter.Actions.MOVE_FORWARD, Critter.Actions.DECREMENT_COUNTER];
      var zag = [Critter.Actions.TURN_LEFT, Critter.Actions.MOVE_FORWARD, Critter.Actions.INCREMENT_COUNTER];
      var toZigOrToZagThatIsTheQuestion = function(stimuli, vitals) {
        return vitals.counter === 0;
      };
      var zigZag = new DecisionNode(toZigOrToZagThatIsTheQuestion, zig, zag);
      anna = new Critter({mind: new CritterMind({decisionTree: zigZag})});

      world.place(anna, {x:0, y: 9});
    });

    it("can alternate actions", function(){
      world.update();
      expect(anna.location).toEqual({x:1, y:9});
      expect(anna.direction).toEqual(CardinalDirection.EAST);
      world.update();
      expect(anna.location).toEqual({x:1, y:8});
      expect(anna.direction).toEqual(CardinalDirection.NORTH);
      world.update();
      expect(anna.location).toEqual({x:2, y:8});
      expect(anna.direction).toEqual(CardinalDirection.EAST);
      world.update();
      expect(anna.location).toEqual({x:2, y:7});
      expect(anna.direction).toEqual(CardinalDirection.NORTH);
      world.update();
      expect(world.contains(anna)).toBeFalsy();
    });
  });
});