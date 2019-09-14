const RelativeDirection = require("./RelativeDirection");
const CardinalDirection = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST'
};

CardinalDirection.getDirectionAfterRotation = function (startingDirection, rotationDirection) {
  var cardinalIndex = _.indexOf(CardinalDirection.ALL_DIRECTIONS, startingDirection) +
    CardinalDirection.ALL_DIRECTIONS.length;
  var relativeIndex = _.indexOf(RelativeDirection.ALL_DIRECTIONS, rotationDirection) +
    RelativeDirection.ALL_DIRECTIONS.length;

  cardinalIndex += relativeIndex;

  return CardinalDirection.ALL_DIRECTIONS[cardinalIndex % CardinalDirection.ALL_DIRECTIONS.length];
};

CardinalDirection.ALL_DIRECTIONS = [
  CardinalDirection.NORTH,
  CardinalDirection.EAST,
  CardinalDirection.SOUTH,
  CardinalDirection.WEST
];

module.exports = CardinalDirection;