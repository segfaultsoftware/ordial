$(function() {
  ResourceSpawner = Backbone.Model.extend({
    spawn: function() {
      var world = window.singletonContext.world;
      if (window.singletonContext.configuration.resourceSpawnRate > Math.random()) {
        var freeCoords = _.sample(world.getFreeTiles());
        if (freeCoords) {
          world.place(new Resource(), freeCoords);
        }
      }
    }
  });
});