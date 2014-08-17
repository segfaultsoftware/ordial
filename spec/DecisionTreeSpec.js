describe("TreeNode", function () {

  describe("#initialize", function () {
    describe("when type=Decision", function() {
      var decisionNode;

      beforeEach(function() {
        decisionNode = {
          condition: function(sensations){
            return sensations.somethingInFront === true;
          },
          left: {
            action: Critter.Actions.MOVE_FORWARD
          },
          right: {
            condition: function(sensations){
              return sensations.resourceToLeft === true;
            },
            left: {
              action: Critter.Actions.REPRODUCE
            },
            right: {
              action: Critter.Actions.STARE_OFF_INTO_SPACE
            }
          }
        }
      });

      it("requires condition to be a function", function() {
        delete decisionNode.condition;
        try {
          new TreeNode(decisionNode);
        }
        catch(e) {

        }
      });

      it("requires left to be a TreeNode", function() {

      });

      it("requires right to be a TreeNode", function() {

      })

    });

    describe("passing in a deep tree", function () {
      var treePojo;
      beforeEach(function () {
//        var getAction = function(tree, sensations) {
//          if (tree.condition) {
//            if (tree.condition(sensations)) {
//              getAction(tree.left, sensations);
//            }
//            else {
//              getAction(tree.right, sensations);
//            }
//          }
//          else {
//            return tree.action;
//          }
//        };

        treePojo = {
          condition: function(sensations){
            return sensations.somethingInFront === true;
          },
          left: {
            action: Critter.Actions.MOVE_FORWARD
          },
          right: {
            condition: function(sensations){
              return sensations.resourceToLeft === true;
            },
            left: {
              action: Critter.Actions.REPRODUCE
            },
            right: {
              action: Critter.Actions.STARE_OFF_INTO_SPACE
            }
          }
        }
      });

      it("should initialize each layer as a tree", function () {

      });
    });
  });

  describe("#getAction", function () {
    describe("when the node has an action", function () {
      it("should return that action");
    });

    describe("when the node has a condition", function () {
      describe("when the condition is true", function () {
        it("should return the left child node's getAction");
      });

      describe("when the condition is false", function () {
        it("should return the right child node's getAction");
      });
    });
  });
});

// DecisionTree.Node
 // condition + left + right
 // value

// tree.getRoot