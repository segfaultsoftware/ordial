var WorldNavigator = function(){
  this.isLocationInsideWorld = function(location){
    var world = singletonContext.world;
    return location.x >= 0 && location.x < world.width &&
    location.y >= 0 && location.y < world.height;
  };

  this.getTileInDirection = function(direction, thing){
    function getOffsetInFrontOf(thingDirection){
      var xDelta = 0, yDelta = 0;
      switch (thingDirection){
        case CardinalDirection.WEST:
          xDelta = -1;
          break;
        case CardinalDirection.NORTH:
          yDelta = -1;
          break;
        case CardinalDirection.EAST:
          xDelta = 1;
          break;
        case CardinalDirection.SOUTH:
          yDelta = 1;
          break;
      }
      return {xDelta: xDelta, yDelta: yDelta};
    }

    var offset;
    if (direction == RelativeDirection.FORWARD){
      offset = getOffsetInFrontOf(thing.direction);
    }
    else {
      var cardinalDirectionAfterRotation = CardinalDirection.getDirectionAfterRotation(thing.direction, direction);
      offset = getOffsetInFrontOf(cardinalDirectionAfterRotation);
    }

    return {x: thing.location.x + offset.xDelta, y: thing.location.y + offset.yDelta};
  };

  this.getFreeTiles = function(){
    var world = singletonContext.world;
    var freeTiles = [];
    for (var y = 0; y < world.height; y++) {
      for (var x = 0; x < world.width; x++) {
        if (!world.tiles[x] || !world.tiles[x][y]) {
          freeTiles.push({x: x, y: y});
        }
      }
    }
    return freeTiles;
  };
  this.getThingAt = function(location){
    var world = singletonContext.world;

    return world.tiles[location.x] ? world.tiles[location.x][location.y] : null;
  };
}