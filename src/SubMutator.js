$(function () {
  SubMutator = Backbone.Model.extend({
    mutate: function (actions) {
      var mutatorFunction = window.singletonContext.randomNumberGenerator.sample([
        this.swap,
        this.insert,
        this.remove,
        this.replace
      ]);

      var result = _.bind(mutatorFunction, this)(actions);
      return result;
    },
    swap: function(actions) {
      if (actions.length > 1) {
        var index1 = window.singletonContext.randomNumberGenerator.random(actions.length - 1);
        var action1 = actions[index1];

        var index2 = window.singletonContext.randomNumberGenerator.random(actions.length - 1);
        actions[index1] = actions[index2];
        actions[index2] = action1;
      }
      return actions;
    },
    insert: function(actions) {
      var newAction = this.randomAction();
      var insertionIndex = window.singletonContext.randomNumberGenerator.random(actions.length - 1);
      actions.splice(insertionIndex, 0, newAction);
      return actions;
    },
    remove: function(actions) {
      var indexToDelete = window.singletonContext.randomNumberGenerator.random(actions.length - 1);
      actions.splice(indexToDelete, 1);
      return actions;
    },
    replace: function(actions) {
      var index = window.singletonContext.randomNumberGenerator.random(actions.length - 1);
      actions[index] = this.randomAction();
      return actions;
    },
    randomAction: function() {
      return window.singletonContext.randomNumberGenerator.sample(_.keys(Critter.Actions));
    }
  })
});
