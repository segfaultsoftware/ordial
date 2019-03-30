var Critter = require("../critter/Critter");
var Condition = require("../critter/Condition");
var _ = require("underscore");

function GeneMutator() {
  this.mutate = function(genes) {
    var mutatorFunction = singletonContext.randomNumberGenerator.sample([
      this.swap,
      this.insert,
      this.remove,
      this.replace,
      this.subMutate
    ]);
    return _.bind(mutatorFunction, this)(genes);
  }

  this.swap = function(genes) {
    if (genes.length > 0) {
      var index1 = singletonContext.randomNumberGenerator.random(genes.length - 1);
      var gene1 = genes[index1];

      var index2 = singletonContext.randomNumberGenerator.random(genes.length - 1);
      genes[index1] = genes[index2];
      genes[index2] = gene1;
    }
    return genes;
  }

  this.insert = function(genes) {
    var newGene = this.randomGene();
    var insertionIndex = singletonContext.randomNumberGenerator.random(genes.length - 1);
    genes.splice(insertionIndex, 0, newGene);
    return genes;
  }

  this.remove = function(genes) {
    if (genes.length > 0) {
      var indexToDelete = singletonContext.randomNumberGenerator.random(genes.length - 1);
      genes.splice(indexToDelete, 1);
    }
    return genes;
  }

  this.replace = function(genes) {
    var index = singletonContext.randomNumberGenerator.random(genes.length - 1);
    genes[index] = this.randomGene();
    return genes;
  }

  this.subMutate = function(genes) {
    if (genes.length > 0) {
      var index = singletonContext.randomNumberGenerator.random(genes.length - 1);
      if (genes[index][0] == 'action') {
        genes[index] = ['action', singletonContext.subMutator.mutate(_.flatten([genes[index][1]]))];
      }
    } else {
      debugger;
    }
    return genes;
  }

  this.randomGene = function() {
    if (singletonContext.randomNumberGenerator.random(1)) {
      return this.randomAction();
    } else {
      return this.randomCondition();
    }
  }

  this.randomAction = function() {
    return ['action', singletonContext.randomNumberGenerator.sample(_.keys(Critter.Actions))];
  }

  this.randomCondition = function() {
    return ['condition', singletonContext.randomNumberGenerator.sample(_.keys(Condition.Collection))];
  }
}

module.exports = GeneMutator;