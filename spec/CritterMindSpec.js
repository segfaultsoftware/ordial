describe("CritterMind", function () {
  describe("#initialize", function() {
    describe("when initialized with an action", function() {
      it("creates a decision tree with that action as the root element", function(){
        var critterMind = new CritterMind({action: Critter.Actions.MOVE_FORWARD});
        var serializedDecisionTree = JSON.stringify(critterMind.decisionTree);
        var expectedDecisionTree = {
          getAction: function() { return Critter.Actions.MOVE_FORWARD }
        };
        expect(serializedDecisionTree).toEqual(JSON.stringify(expectedDecisionTree));
      });
    });

    describe("when initialized with a decision tree", function() {
      it("sets the decision tree", function() {
        var sourceTree = {foo: "bar", baz: 1};
        var critterMind = new CritterMind({decisionTree: sourceTree});
        expect(critterMind.decisionTree).toBe(sourceTree);
      });
    });

    describe("when initialized with nothing", function() {
      it("defaults to staring off into space", function() {
        var critterMind = new CritterMind();
        expect(critterMind.decisionTree.getAction()).toEqual(Critter.Actions.STARE_OFF_INTO_SPACE);
      });
    });
  });

  describe("#getAction", function(){
    var decisionTree, senses, critterMind;
    beforeEach(function () {
      senses = {a :1};
      decisionTree = jasmine.createSpyObj("decisionTree", ['getAction']);
      decisionTree.getAction.and.returnValue(Critter.Actions.REPRODUCE);
      critterMind = new CritterMind({decisionTree: decisionTree});
    });

    it("should return the result of the decision tree", function() {
      expect(critterMind.getAction(senses)).toBe(Critter.Actions.REPRODUCE);
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
