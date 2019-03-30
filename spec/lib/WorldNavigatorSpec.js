var WorldNavigator = require("../../src/javascript/lib/WorldNavigator");
var Rock = require("../../src/javascript/lib/models/Rock");
var RelativeDirection = require("../../src/javascript/lib/models/RelativeDirection");
var CardinalDirection = require("../../src/javascript/lib/models/CardinalDirection");
var Critter = require("../../src/javascript/lib/critter/Critter");

describe("WorldNavigator", function(){
  var navigator, world;
  beforeEach(function(){
    navigator = new WorldNavigator();
    world = singletonContext.world;
  });

  describe("#isLocationInsideWorld", function() {
    var x, y;

    describe("for an y within the world bounds", function() {
      beforeEach(function() {
        y = singletonContext.randomNumberGenerator.random(0, 7);
      });

      it("should return false for an x less than zero", function() {
        expect(navigator.isLocationInsideWorld({x: -1, y: y})).toBeFalsy();
      });

      it("should return true for an x within the world bounds", function() {
        expect(navigator.isLocationInsideWorld({x: singletonContext.randomNumberGenerator.random(0, 7), y: y})).toBeTruthy();
      });

      it("should return false for an x greater than width", function() {
        expect(navigator.isLocationInsideWorld({x: world.width, y: y})).toBeFalsy();
      });
    });

    describe("for an x within the world bounds", function() {
      beforeEach(function() {
        x = singletonContext.randomNumberGenerator.random(0, 7);
      });

      it("should return false for a y less than zero", function() {
        expect(navigator.isLocationInsideWorld({x: x, y: -1})).toBeFalsy();
      });

      it("should return true for a y within the world bounds", function() {
        expect(navigator.isLocationInsideWorld({x: x, y: singletonContext.randomNumberGenerator.random(0, 7)})).toBeTruthy();
      });

      it("should return true for a y greater than height", function() {
        expect(navigator.isLocationInsideWorld({x: x, y: world.height})).toBeFalsy();
      });
    });

  });

  describe("#getTileInDirection", function() {
    var relativeDirection, rob;

    beforeEach(function() {
      rob = new Critter();
      rob.location = {x: 1, y:1};
    });

    describe("RelativeDirection.FORWARD", function () {
      beforeEach(function() {
        relativeDirection = RelativeDirection.FORWARD;
      });

      it("should return coordinates for the tile to the WEST of Rob when Rob is facing WEST", function() {
        rob.direction = CardinalDirection.WEST;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x:0, y: 1});
      });

      it("should return coordinates for the tile to the EAST of Rob when Rob is facing EAST", function() {
        rob.direction = CardinalDirection.EAST;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 2, y: 1});
      });

      it("should return coordinates for the tile to the NORTH of Rob when Rob is facing NORTH", function() {
        rob.direction = CardinalDirection.NORTH;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 0});
      });

      it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing SOUTH", function() {
        rob.direction = CardinalDirection.SOUTH;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 2});
      });
    });

    describe("RelativeDirection.LEFT", function () {
      beforeEach(function() {
        relativeDirection = RelativeDirection.LEFT;
      });

      it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing WEST", function() {
        rob.direction = CardinalDirection.WEST;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x:1, y: 2});
      });

      it("should return coordinates for the tile to the NORTH of Rob when Rob is facing ESAT", function() {
        rob.direction = CardinalDirection.EAST;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 0});
      });

      it("should return coordinates for the tile to the WEST of Rob when Rob is facing NORTH", function() {
        rob.direction = CardinalDirection.NORTH;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 0, y: 1});
      });

      it("should return coordinates for the tile to the EAST of Rob when Rob is facing SOUTH", function() {
        rob.direction = CardinalDirection.SOUTH;
        expect(navigator.getTileInDirection(relativeDirection, rob)).toEqual({x: 2, y: 1});
      });
    });
  });

  describe("#getFreeTiles", function () {
    beforeEach(function () {
      world.height = 2;
      world.width = 2;
    });

    it("should return a list of empty tiles", function () {
      var freeTiles = navigator.getFreeTiles();
      expect(freeTiles).toMatchArray([
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: 1, y: 1}
      ]);
    });

    describe("after a thing has been placed in a tile", function () {
      var thing;
      beforeEach(function () {
        thing = new Rock();
        world.place(thing, {x:1, y:0});
      });
      it("no longer returns that tile", function () {
        expect(navigator.getFreeTiles()).toMatchArray([
          {x: 0, y: 0},
          {x: 0, y: 1},
          {x: 1, y: 1}
        ]);
      });

      describe("after a thing has been removed from a tile", function () {
        beforeEach(function () {
          world.remove(thing);
        });
        it("returns that tile", function () {
          expect(navigator.getFreeTiles()).toMatchArray([
            {x: 0, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 1}
          ]);
        });
      });
    });
  });
});