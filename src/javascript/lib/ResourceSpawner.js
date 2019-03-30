var Resource = require("./models/Resource");

function ResourceSpawner() {
  this.spawn = function() {
    var world = singletonContext.world;
    var worldNavigator = singletonContext.worldNavigator;

    if (singletonContext.configuration.resourceSpawnRate * 100 >= singletonContext.randomNumberGenerator.random(100)) {
      var freeCoords = singletonContext.randomNumberGenerator.sample(worldNavigator.getFreeTiles());
      if (freeCoords) {
        world.place(new Resource(), freeCoords);
      }
    }
  }
}

module.exports = ResourceSpawner;
