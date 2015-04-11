$(function() {
  GeneMutator = Backbone.Model.extend({
    mutate: function(genes){
      var mutatorFunction = _.sample([
        this.swap,
        this.insert,
        this.remove
      ]);
      return _.bind(mutatorFunction, this)(genes);
    },
    swap: function(genes){
      var index1 = _.random(genes.length - 1);
      var gene1 = genes[index1];

      var index2 = _.random(genes.length -1);
      genes[index1] = genes[index2];
      genes[index2] = gene1;
      return genes;
    },
    insert: function(genes){
      var newGene;
      if(_.random(1)){
        newGene = this.randomAction();
      } else {
        newGene = this.randomCondition();
      }
      var insertionIndex = _.random(genes.length -1);
      genes.splice(insertionIndex, 0, newGene);
      return genes;
    },
    remove: function(genes){
      var indexToDelete = _.random(genes.length -1);
      genes.splice(indexToDelete, 1);
      return genes;
    },
    randomAction: function(){
      return ['action', _.sample(_.keys(Critter.Actions))];
    },
    randomCondition: function(){
      return ['condition', _.sample(_.keys(Condition.Collection))];
    }
  });
});