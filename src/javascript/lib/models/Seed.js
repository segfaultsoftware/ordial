var Backbone = require("backbone");

Seed = Backbone.Model.extend({
  initialize: function() {
    this.set('isFinalized', false);
    if (!this.get('seedValue')) {
      singletonContext.randomNumberGenerator.seedrandom();
      this.set('seedValue', singletonContext.randomNumberGenerator.random(1000000000));
    }
  },

  seedRandom: function(){
    singletonContext.randomNumberGenerator.seedrandom(this.get('seedValue'));
  }
});

module.exports = Seed;