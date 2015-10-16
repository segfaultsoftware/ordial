$(function() {
  Seed = Backbone.Model.extend({
    initialize: function() {
      this.set('isFinalized', false);
      if (!this.get('seedValue')) {
        window.singletonContext.randomNumberGenerator.seedrandom();
        this.set('seedValue', window.singletonContext.randomNumberGenerator.random());
      }
    },

    seedRandom: function(){
      window.singletonContext.randomNumberGenerator.seedrandom(this.get('seedValue'));
    }
  });
});
