$(function() {
  StimulusPackager = Backbone.Model.extend({
    package: function(world, critter){
      function getThingInDirection(relativeDirection) {
        var tileInDirection = world.getTileInDirection(relativeDirection, critter);
        var thingInDirection = world.getThingAt(tileInDirection) || null;
        if (!world.isLocationInsideWorld(tileInDirection)) {
          thingInDirection = TheVoid;
        }
        
        return thingInDirection
      }

      return {
        thingInFrontOfMe: getThingInDirection(RelativeDirection.FORWARD),
        thingToTheLeftOfMe: getThingInDirection(RelativeDirection.LEFT),
        thingToTheRightOfMe: getThingInDirection(RelativeDirection.RIGHT)
      };
    }
  });
});
