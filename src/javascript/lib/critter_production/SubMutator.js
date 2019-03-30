var Critter = require("../critter/Critter");
var _ = require("underscore");

function SubMutator() {
  this.mutate = function (actions) {
    var mutatorFunction = singletonContext.randomNumberGenerator.sample([
      this.swap,
      this.insert,
      this.remove,
      this.replace
    ]);

    var result = _.bind(mutatorFunction, this)(actions);
    return result;
  }

  this.swap = function (actions) {
    var index1 = singletonContext.randomNumberGenerator.random(actions.length - 1);
    var action1 = actions[index1];

    var index2 = singletonContext.randomNumberGenerator.random(actions.length - 1);
    actions[index1] = actions[index2];
    actions[index2] = action1;
    return actions;
  }

  this.insert = function (actions) {
    var newAction = this.randomAction();
    var insertionIndex = singletonContext.randomNumberGenerator.random(actions.length - 1);
    actions.splice(insertionIndex, 0, newAction);
    return actions;
  }

  this.remove = function (actions) {
    var indexToDelete = singletonContext.randomNumberGenerator.random(actions.length - 1);
    actions.splice(indexToDelete, 1);
    if (actions.length == 0) {
      actions.push('STARE_OFF_INTO_SPACE');
    }
    return actions;
  }

  this.replace = function (actions) {
    var index = singletonContext.randomNumberGenerator.random(actions.length - 1);
    actions[index] = this.randomAction();
    return actions;
  }

  this.randomAction = function () {
    return singletonContext.randomNumberGenerator.sample(_.keys(Critter.Actions));
  }
}

module.exports = SubMutator;