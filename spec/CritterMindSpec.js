describe("CritterMind", function () {

  describe("#getAction", function(){
    it("should return with the initialized action", function(){
      var critterMind = new CritterMind(Critter.Actions.MOVE_FORWARD);
      expect(critterMind.getAction()).toBe(Critter.Actions.MOVE_FORWARD);

      var anotherCritter = new CritterMind(Critter.Actions.TURN_LEFT);
      expect(anotherCritter.getAction()).toBe(Critter.Actions.TURN_LEFT);
    });
  });

  describe(".EmptyMind", function() {
    describe("#getAction", function(){
      it("always returns noop", function() {
        expect(CritterMind.EmptyMind.getAction()).toBe(Critter.Actions.STARE_OFF_INTO_SPACE);
      });
    });
  });
});