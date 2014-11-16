$(function() {
  StimulusPackager = Backbone.Model.extend({
    package: function(world, critter){
      var tileInFront = world.getTileInDirection(RelativeDirection.FORWARD, critter);
      var thingInFront = world.getThingAt(tileInFront);
      if (!world.isLocationInsideWorld(tileInFront)) {
        thingInFront = TheVoid;
      }

      return {thingInFrontOfMe: thingInFront};
    }
  });
});