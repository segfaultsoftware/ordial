$(function() {
  CritterMind = Backbone.Model.extend({
    initialize: function(options) {
      if (options && options.decisionTree) {
        this.decisionTree = options.decisionTree;
      } else if (options && options.action) {
        this.decisionTree = { getAction: function() { return options.action } };
      } else {
        this.decisionTree = { getAction: function() { return Critter.Actions.STARE_OFF_INTO_SPACE } };
      }
    },

    getAction : function(sensations) {
      return this.decisionTree.getAction(sensations);
    }


  });

  CritterMind.EmptyMind = new CritterMind({action:Critter.Actions.STARE_OFF_INTO_SPACE});
});
