$(function() {
  RandomNumberGenerator = function() {
    this.nextRandoms = [];

    this.seedrandom = function(seed) {
      if (seed !== undefined) {
        return Math.seedrandom(seed);
      }
      else {
        return Math.seedrandom();
      }
    };

    this.random = function() {
      if (this.nextRandoms.length > 0) {
        return this.nextRandoms.shift();
      }
      else if (arguments.length === 2) {
        return _.random(arguments[0], arguments[1]);
      }
      else if (arguments.length === 1) {
        return _.random(arguments[0]);
      }
      else {
        return Math.random();
      }
    };

    this.sample = function(array) {
      if (this.nextRandoms.length > 0) {
        return array[this.nextRandoms.shift()];
      }
      else {
        return _.sample(array);
      }
    };

    this.stubRandom = function(nextRandoms) {
      this.nextRandoms = nextRandoms;
    }
  };
});
