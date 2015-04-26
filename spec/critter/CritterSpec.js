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
        expect(rob.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA);
      });

      it("should set a random color", function () {
        expect(["lavender", "black", "blue", "orange", "eggshell","pink", "teal","purple"]).toContain(rob.color);
      });

      it('gives critters their very own vitals', function(){
        var bob = new Critter();
        bob.vitals.counter += 17;
        expect(rob.vitals.counter).not.toEqual(bob.vitals.counter);
      });
    });

    it("merges defaults of vitals with any overrides", function () {
      rob = new Critter({vitals: {mana: 999}});
      expect(rob.vitals.mana).toEqual(999);
      expect(rob.vitals.counter).toEqual(Critter.DEFAULT_STARTING_COUNTER);

      rob = new Critter({vitals: {counter: 2515}});
      expect(rob.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA);
      expect(rob.vitals.counter).toEqual(2515);
    });
    
    describe("when given genes", function(){
      var mindFactory, createdMind, genes;
      beforeEach(function(){
        genes = [['action', 'MOVE_FORWARD']];
        createdMind = new CritterMind();
        mindFactory = window.singletonContext.mindFactory;
      });
      it("generates a mind", function(){
        spyOn(mindFactory, 'create').and.returnValue(createdMind);
        var critter = new Critter({genes:genes});
        expect(mindFactory.create).toHaveBeenCalledWith(genes);
        expect(critter.mind).toBe(createdMind);
      });
      
      it("stores the genes.", function(){
        var critter = new Critter({genes: genes});
        expect(critter.genes).toBe(genes);
      });
    });
    
    describe("when not given genes", function(){
      it("creates default genes", function(){
        var critter = new Critter();
        expect(critter.genes).toEqual([]);
      });
    });
  });

  describe("#getActions", function() {
    var mind, vitals;

    beforeEach(function() {
      vitals = {counter: 7};
      mind = new CritterMind();
      rob = new Critter({mind: mind, vitals: vitals});
    });

    it('should request the next action from its mind', function() {
      var stimuli = {foo: 'bar'};
      spyOn(mind, "getActions");
      rob.getActions(stimuli);
      expect(mind.getActions).toHaveBeenCalledWith(stimuli, vitals);
    });
  });

  describe("#canEat", function() {
    beforeEach(function() {
      rob = new Critter();
    });

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
      rob = new Critter();
      resource = new Resource();
      originalMana = rob.vitals.mana;
      resourceMana = resource.mana;
    });

    describe("when eating a resource", function() {
      it("should increment the critter's mana by the resource amount", function () {
         rob.eat(resource);
         expect(rob.vitals.mana).toEqual(originalMana + resourceMana);
      });
    });

    describe("when there's nothing to eat", function() {
      it("should not touch the critter's mana", function() {
        rob.eat(undefined);
        expect(rob.vitals.mana).toEqual(originalMana);
      });
    });
  });

  describe("#replicateGenes", function() {
    var deepGenes;

    beforeEach(function() {
      spyOn(singletonContext.mindFactory, 'create').and.returnValue(null);

      deepGenes = [
        ['foo', ['bar', 'baz']]
      ];
      rob = new Critter({genes: deepGenes});
    });

    it("should return a deep clone of the current genes", function() {
      var replicatedGenes = rob.replicateGenes();
      expect(replicatedGenes).toEqual(deepGenes);

      replicatedGenes[0][0] = 'derp';

      expect(replicatedGenes).not.toEqual(deepGenes);

      var justInCase = rob.replicateGenes();
      expect(justInCase).toEqual(deepGenes);

      justInCase[0][1][1] = 'blarg';

      expect(justInCase).not.toEqual(deepGenes);
    });
  });
});
