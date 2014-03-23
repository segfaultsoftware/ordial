$(function() {
  Seed = Backbone.Model.extend({
    initialize: function() {
      this.set('isFinalized', false);
      if (!this.get('seedValue')) {
        Math.seedrandom();
        this.set('seedValue', Math.random());
      }
    },

    seedRandom: function(){
      Math.seedrandom(this.get('seedValue'));
    }
  });
});