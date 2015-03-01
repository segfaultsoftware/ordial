$(function() {
  CardinalDirection = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
  };

  CardinalDirection.getDirectionAfterRotation = function(startingDirection, rotationDirection) {
    var index = _.indexOf(CardinalDirection.ALL_DIRECTIONS, startingDirection) +
      CardinalDirection.ALL_DIRECTIONS.length;
    if(rotationDirection == RelativeDirection.LEFT) {
      index -= 1;
    } else if (rotationDirection == RelativeDirection.RIGHT){
      index += 1;
    } else {
      index += 2;
      console.warn('rotating in this direction not implemented yet.', rotationDirection);
    }

    return CardinalDirection.ALL_DIRECTIONS[index % CardinalDirection.ALL_DIRECTIONS.length];
  };

  CardinalDirection.ALL_DIRECTIONS = [
    CardinalDirection.NORTH,
    CardinalDirection.EAST,
    CardinalDirection.SOUTH,
    CardinalDirection.WEST
  ];
});