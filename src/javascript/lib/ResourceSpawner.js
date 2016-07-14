ResourceSpawner = Backbone.Model.extend({
  spawn: function() {
    var world = singletonContext.world;
    if (singletonContext.configuration.resourceSpawnRate * 100 >= singletonContext.randomNumberGenerator.random(100)) {
      var freeCoords = singletonContext.randomNumberGenerator.sample(world.getFreeTiles());
      if (freeCoords) {
        world.place(new Resource(), freeCoords);
      }
    }
  }
});
