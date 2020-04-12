var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

const Seed = Backbone.Model.extend({
  defaults: {
    isFinalized: false,
    seedValue: null,
  },

  initialize: function (attributes) {
    Object.assign(this.attributes, attributes);
    if (!this.get('seedValue')) {
      singletonContext.randomNumberGenerator.seedrandom();
      this.set('seedValue', singletonContext.randomNumberGenerator.random(1000000000));
    }
  },

  seedRandom: function () {
    singletonContext.randomNumberGenerator.seedrandom(this.get('seedValue'));
  }
});

module.exports = Seed;