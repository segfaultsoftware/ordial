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

    getAction : function(stimuli, currentNode) {
      currentNode = currentNode || this.decisionTree;
      if (currentNode.type === DecisionNode.TYPE) {
        if (currentNode.condition(stimuli)) {
          return this.getAction(stimuli, currentNode.leftNode);
        }
        else {
          return this.getAction(stimuli, currentNode.rightNode);
        }
      }
      else {
        return currentNode;
      }
    }


  });

  CritterMind.EmptyMind = new CritterMind({action:Critter.Actions.STARE_OFF_INTO_SPACE});
});
