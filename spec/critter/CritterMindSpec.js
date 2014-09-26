describe("CritterMind", function () {
  describe("#getAction", function(){
    var senses, critterMind;
    beforeEach(function () {
      senses = {a :1};
    });

    describe("when initialized with no decision tree or action", function() {
      it("defaults to staring off into space", function() {
        var critterMind = new CritterMind();
        expect(critterMind.getAction()).toEqual(Critter.Actions.STARE_OFF_INTO_SPACE);
      });
    });

    describe("when initialized with an action", function() {
      it("should return that action", function() {
        var critterMind = new CritterMind({action: Critter.Actions.MOVE_FORWARD});
        expect(critterMind.getAction()).toEqual(Critter.Actions.MOVE_FORWARD);
      });
    });

    describe("when the root of the decision tree is an action node", function() {
      beforeEach(function() {
        var treeWithJustAnActionNode = Critter.Actions.REPRODUCE;
        critterMind = new CritterMind({decisionTree: treeWithJustAnActionNode});
      });

      it("should return the action", function() {
        expect(critterMind.getAction(senses)).toBe(Critter.Actions.REPRODUCE);
      });
    });

    describe("when the root of the decision tree is a decision node", function() {
      var condition, treeStartingAtDecisionNode;

      beforeEach(function() {
        condition = jasmine.createSpy();
        treeStartingAtDecisionNode = new DecisionNode(
          condition,
          Critter.Actions.TURN_LEFT,
          Critter.Actions.REPRODUCE
        );

        critterMind = new CritterMind({decisionTree: treeStartingAtDecisionNode});
      });

      it("should evaluate the condition with the senses", function() {
        critterMind.getAction(senses);
        expect(condition).toHaveBeenCalledWith(senses);
      });

      describe("when the condition in the decision tree returns true", function() {
        beforeEach(function() {
          condition.and.returnValue(true);
        });

        it("should return the result of the left side of the tree", function() {
          expect(critterMind.getAction()).toEqual(Critter.Actions.TURN_LEFT);
        });
      });

      describe("when the condition in the decision tree return false", function() {
        beforeEach(function() {
          condition.and.returnValue(false);
        });

        it("should return the result of the right side of the tree", function() {
          expect(critterMind.getAction()).toEqual(Critter.Actions.REPRODUCE);
        });
      });

      describe("and the decision node has nested decision nodes", function() {
        beforeEach(function() {
          treeStartingAtDecisionNode = new DecisionNode(condition, treeStartingAtDecisionNode, treeStartingAtDecisionNode);
          condition.and.returnValue(false);
        });

        it("should recursively evaluate the conditions of the decision nodes", function() {
          expect(critterMind.getAction()).toEqual(Critter.Actions.REPRODUCE);
        });
      });
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
