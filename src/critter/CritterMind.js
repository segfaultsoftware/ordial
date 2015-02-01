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

    getActions : function(stimuli, vitals, currentNode) {
      currentNode = currentNode || this.decisionTree;
      if (currentNode.type === DecisionNode.TYPE) {
        if (currentNode.condition(stimuli, vitals)) {
          return this.getActions(stimuli, vitals, currentNode.leftNode);
        }
        else {
          return this.getActions(stimuli, vitals, currentNode.rightNode);
        }
      }
      else {
        return currentNode;
      }
    }


  });

  CritterMind.EmptyMind = new CritterMind({action:Critter.Actions.STARE_OFF_INTO_SPACE});
});
