$(function() {
  GeneMutator = Backbone.Model.extend({
    mutate: function(genes){
      var mutatorFunction = window.singletonContext.randomNumberGenerator.sample([
        this.swap,
        this.insert,
        this.remove,
        this.replace
      ]);
      return _.bind(mutatorFunction, this)(genes);
    },
    swap: function(genes){
      var index1 = window.singletonContext.randomNumberGenerator.random(genes.length - 1);
      var gene1 = genes[index1];

      var index2 = window.singletonContext.randomNumberGenerator.random(genes.length -1);
      genes[index1] = genes[index2];
      genes[index2] = gene1;
      return genes;
    },
    insert: function(genes){
      var newGene = this.randomGene();
      var insertionIndex = window.singletonContext.randomNumberGenerator.random(genes.length -1);
      genes.splice(insertionIndex, 0, newGene);
      return genes;
    },
    remove: function(genes){
      var indexToDelete = window.singletonContext.randomNumberGenerator.random(genes.length -1);
      genes.splice(indexToDelete, 1);
      return genes;
    },
    replace: function(genes) {
      var index = window.singletonContext.randomNumberGenerator.random(genes.length - 1);
      genes[index] = this.randomGene();
      return genes;
    },
    randomGene: function() {
      if(window.singletonContext.randomNumberGenerator.random(1)){
        return this.randomAction();
      } else {
        return this.randomCondition();
      }
    },
    randomAction: function(){
      return ['action', window.singletonContext.randomNumberGenerator.sample(_.keys(Critter.Actions))];
    },
    randomCondition: function(){
      return ['condition', window.singletonContext.randomNumberGenerator.sample(_.keys(Condition.Collection))];
    }
  });
});
