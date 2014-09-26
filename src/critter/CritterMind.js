$(function() {
  CritterMind = Backbone.Model.extend({
    initialize: function(options) {
      if (options && options.decisionTree) {
        this.decisionTree = options.decisionTree;
      } else if (options && options.action) {
        this.decisionTree = options.action;
      } else {
        this.decisionTree = Critter.Actions.STARE_OFF_INTO_SPACE;
      }
    },

    getAction : function(sensations, currentNode) {
      currentNode = currentNode || this.decisionTree;
      if (currentNode.type === DecisionNode.TYPE) {
        if (currentNode.condition(sensations)) {
          return this.getAction(sensations, currentNode.leftNode);
        }
        else {
          return this.getAction(sensations, currentNode.rightNode);
        }
      }
      else {
        return currentNode;
      }
    }


  });

  CritterMind.EmptyMind = new CritterMind({action:Critter.Actions.STARE_OFF_INTO_SPACE});
});
