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
    if(arguments[0] < 0){
      console.error("random called with ", arguments[0])
    }

    var result;
    if (this.nextRandoms.length > 0) {
      result = this.nextRandoms.shift();
    }
    else if (arguments.length === 2) {
      result = _.random(arguments[0], arguments[1]);
    }
    else if (arguments.length === 1) {
      result = _.random(arguments[0]);
    }
    else {
      result = Math.random();
    }
    return result;
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
