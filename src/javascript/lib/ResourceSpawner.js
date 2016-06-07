$(function() {
  ResourceSpawner = Backbone.Model.extend({
    spawn: function() {
      var world = singletonContext.world;
      if (singletonContext.configuration.resourceSpawnRate > singletonContext.randomNumberGenerator.random()) {
        var freeCoords = singletonContext.randomNumberGenerator.sample(world.getFreeTiles());
        if (freeCoords) {
          world.place(new Resource(), freeCoords);
        }
      }
    }
  });
});
