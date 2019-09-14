const CardinalDirection = require("../../src/javascript/lib/models/CardinalDirection");
const RelativeDirection = require("../../src/javascript/lib/models/RelativeDirection");
describe("CardinalDirection", function() {
  describe("#getDirectionAfterRotation", function() {
    describe("rotating left", function() {
      it("from NORTH should return WEST", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.NORTH,
          RelativeDirection.LEFT
        );
        expect(newDirection).toEqual(CardinalDirection.WEST);
      });

      it("from WEST should return SOUTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.WEST,
          RelativeDirection.LEFT
        );
        expect(newDirection).toEqual(CardinalDirection.SOUTH);
      });

      it("from SOUTH should return EAST", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.SOUTH,
          RelativeDirection.LEFT
        );
        expect(newDirection).toEqual(CardinalDirection.EAST);
      });

      it("from EAST should return NORTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.EAST,
          RelativeDirection.LEFT
        );
        expect(newDirection).toEqual(CardinalDirection.NORTH);
      });
    });

    describe("rotating right", function() {
      it("from NORTH should return EAST", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.NORTH,
          RelativeDirection.RIGHT
        );
        expect(newDirection).toEqual(CardinalDirection.EAST);
      });

      it("from EAST should return SOUTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.EAST,
          RelativeDirection.RIGHT
        );
        expect(newDirection).toEqual(CardinalDirection.SOUTH);
      });

      it("from SOUTH should return WEST", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.SOUTH,
          RelativeDirection.RIGHT
        );
        expect(newDirection).toEqual(CardinalDirection.WEST);
      });

      it("from WEST should return NORTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.WEST,
          RelativeDirection.RIGHT
        );
        expect(newDirection).toEqual(CardinalDirection.NORTH);
      });
    });

    describe("rotating behind", function(){
      it("from NORTH should return SOUTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.NORTH,
          RelativeDirection.BEHIND
        );
        expect(newDirection).toEqual(CardinalDirection.SOUTH);
      });

      it("from SOUTH should return NORTH", function() {
        var newDirection = CardinalDirection.getDirectionAfterRotation(
          CardinalDirection.SOUTH,
          RelativeDirection.BEHIND
        );
        expect(newDirection).toEqual(CardinalDirection.NORTH);
      });
    })
  });
});