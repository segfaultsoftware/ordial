describe("Critter", function() {
  var rob;

  beforeEach(function() {

  });

  describe("#initialize", function() {
    it('uses the default EmptyMind if no mind is passed in', function() {
      rob = new Critter();
      expect(rob.mind).toEqual(CritterMind.EmptyMind);
    });
  });

  describe("#getAction", function() {
    var mind;

    beforeEach(function() {
      mind = new CritterMind();
      rob = new Critter({mind: mind});
    });

    it('should request the next action from its mind', function() {
      spyOn(mind, "getAction");
      rob.getAction();
      expect(mind.getAction).toHaveBeenCalled();
    });
  })
});