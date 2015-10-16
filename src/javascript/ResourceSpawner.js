$(function() {
  ResourceSpawner = Backbone.Model.extend({
    spawn: function() {
      var world = window.singletonContext.world;
      if (window.singletonContext.configuration.resourceSpawnRate > window.singletonContext.randomNumberGenerator.random()) {
        var freeCoords = window.singletonContext.randomNumberGenerator.sample(world.getFreeTiles());
        if (freeCoords) {
          world.place(new Resource(), freeCoords);
        }
      }
    }
  });
});
