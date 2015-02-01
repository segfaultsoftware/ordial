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

      it("should set a random color", function () {
        expect(["lavender", "black", "blue", "orange", "eggshell","pink", "teal","purple"]).toContain(rob.color);
      });

    });

    it('overrides the starting mana if mana is passed in', function() {
      rob = new Critter({mana: 999});
      expect(rob.mana).toEqual(999);
    });
  });

  describe("#getActions", function() {
    var mind;

    beforeEach(function() {
      mind = new CritterMind();
      rob = new Critter({mind: mind});
    });

    it('should request the next action from its mind', function() {
      var stimuli = {foo: 'bar'};
      spyOn(mind, "getActions");
      rob.getActions(stimuli);
      expect(mind.getActions).toHaveBeenCalledWith(stimuli);
    });
  });

  describe("#canEat", function() {
    it('for a resource should return true', function() {
      expect(rob.canEat(new Resource())).toBe(true);
    });

    it('for a critter should return false', function() {
      expect(rob.canEat(new Critter())).toBe(false);
    });
  });

  describe("#eat", function () {
    var originalMana, resourceMana, resource;
    beforeEach(function () {
      resource = new Resource();
      originalMana = rob.mana;
      resourceMana = resource.mana;
    });

    describe("when eating a resource", function() {
      it("should increment the critter's mana by the resource amount", function () {
         rob.eat(resource);
         expect(rob.mana).toEqual(originalMana + resourceMana);
      });
    });

    describe("when there's nothing to eat", function() {
      it("should not touch the critter's mana", function() {
        rob.eat(undefined);
        expect(rob.mana).toEqual(originalMana);
      });
    });
  });
});
