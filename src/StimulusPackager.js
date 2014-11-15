$(function() {
  StimulusPackager = Backbone.Model.extend({
    package: function(world, critter){
      var tileInFront = world.getTileInDirection(RelativeDirection.FORWARD, critter);
      var thingInFront = world.getThingAt(tileInFront);

      return {thingInFrontOfMe: thingInFront};
    }
  });
});