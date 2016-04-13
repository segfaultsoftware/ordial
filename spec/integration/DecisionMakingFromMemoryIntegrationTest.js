describe("Decision making from memory", function () {
  var world;
  describe("when a critter wants to do something different every turn", function () {
    var anna;
    beforeEach(function () {
      world = window.singletonContext.world;
      var zig = ['action', ['TURN_RIGHT', 'MOVE_FORWARD', 'DECREMENT_COUNTER']];
      var zag = ['action', ['TURN_LEFT', 'MOVE_FORWARD', 'INCREMENT_COUNTER']];
      var mindGenes = [['condition', 'counter0'], zig, zag];
      anna = new Critter({genes: mindGenes});
      anna.vitals.mana = 2*(Critter.Actions.TURN_LEFT.cost +
                            Critter.Actions.MOVE_FORWARD.cost + Critter.Actions.INCREMENT_COUNTER.cost) + 2*(Critter.Actions.TURN_RIGHT.cost + Critter.Actions.MOVE_FORWARD.cost + Critter.Actions.DECREMENT_COUNTER.cost) + 1;

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
      expect(anna.isDead()).toBeTruthy();
    });
  });
});