describe("Critter", function() {
  beforeEach(function() {

  });

  describe("getAction", function(){
    it("should return MOVE_FORWARD", function(){
      var critter = new Critter();
      expect(critter.getAction()).toBe(Critter.Actions.MOVE_FORWARD);
    });
  });
});