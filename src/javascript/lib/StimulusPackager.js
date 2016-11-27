StimulusPackager = Backbone.Model.extend({
  getThingInDirection: function(relativeDirection, critter) {
    var world = singletonContext.world;

    var tileInDirection = world.getTileInDirection(relativeDirection, critter);
    var thingInDirection = world.getThingAt(tileInDirection) || null;
    if (!world.isLocationInsideWorld(tileInDirection)) {
      thingInDirection = TheVoid;
    }

    return thingInDirection
  },

  package: function(critter){
    return {
      thingInFrontOfMe: this.getThingInDirection(RelativeDirection.FORWARD, critter),
      thingToTheLeftOfMe: this.getThingInDirection(RelativeDirection.LEFT, critter),
      thingToTheRightOfMe: this.getThingInDirection(RelativeDirection.RIGHT, critter)
    };
  }
});
