describe("Critter", function() {
  var rob;

  describe("#initialize", function() {
    describe("using defaults", function() {
      beforeEach(function() {
        rob = new Critter();
      });

      it('uses the default EmptyMind', function() {
        expect(rob.mind).toEqual(CritterMind.EmptyMind);
      });

      it('sets the mana to default', function() {
        expect(rob.mana).toEqual(Critter.DEFAULT_STARTING_MANA);
      });
    });

    it('overrides the starting mana if mana is passed in', function() {
      rob = new Critter({mana: 999});
      expect(rob.mana).toEqual(999);
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
  });
});