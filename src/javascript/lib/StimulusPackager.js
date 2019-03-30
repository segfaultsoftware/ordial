var TheVoid = require("./models/TheVoid");
var RelativeDirection = require("./models/RelativeDirection");

function StimulusPackager() {
  this.getThingInDirection = function (relativeDirection, critter) {
    var worldNavigator = singletonContext.worldNavigator;

    var tileInDirection = worldNavigator.getTileInDirection(relativeDirection, critter);
    var thingInDirection = worldNavigator.getThingAt(tileInDirection) || null;
    if (!worldNavigator.isLocationInsideWorld(tileInDirection)) {
      thingInDirection = TheVoid;
    }

    return thingInDirection
  };

  this.package = function (critter) {
    return {
      thingInFrontOfMe: this.getThingInDirection(RelativeDirection.FORWARD, critter),
      thingToTheLeftOfMe: this.getThingInDirection(RelativeDirection.LEFT, critter),
      thingToTheRightOfMe: this.getThingInDirection(RelativeDirection.RIGHT, critter)
    };
  }
}

module.exports = StimulusPackager;
