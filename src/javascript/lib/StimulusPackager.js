StimulusPackager = Backbone.Model.extend({
  getThingInDirection: function(relativeDirection, critter) {
    var worldNavigator = singletonContext.worldNavigator;

    var tileInDirection = worldNavigator.getTileInDirection(relativeDirection, critter);
    var thingInDirection = worldNavigator.getThingAt(tileInDirection) || null;
    if (!worldNavigator.isLocationInsideWorld(tileInDirection)) {
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
