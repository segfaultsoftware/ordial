describe("World", function() {
  var world, rob, zoe, kim, joe, ben, stimulusPackager;

  beforeEach(function() {
    stimulusPackager = jasmine.createSpyObj('packager', ['package']);
    singletonContext.stimulusPackager = stimulusPackager;
    world = singletonContext.world = new World();
    rob = new Critter({mind: new CritterMind({action: Critter.Actions.MOVE_FORWARD })});
    zoe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_LEFT })});
    kim = new Critter({mind: new CritterMind({action: Critter.Actions.REPRODUCE })});
    joe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_RIGHT })});
    ben = new Critter({mind: new CritterMind({action: Critter.Actions.MOVE_FORWARD_AND_EAT_CRITTER })});
  });

  describe("#update", function(){
    it("updates the critters");

    it("spawns resources");

    it("silences all the sounds in the world", function(){
      spyOn(singletonContext.soundSilencer, "silenceWorld");
      world.update();
      expect(singletonContext.soundSilencer.silenceWorld).toHaveBeenCalled();
    });

  });


  describe("#place", function() {
    var location;

    describe('in a tile within the world', function() {
      beforeEach(function() {
        location = {
          x: singletonContext.randomNumberGenerator.random(0, 4),
          y: singletonContext.randomNumberGenerator.random(0, 4)
        };

        spyOn(console, "error").and.callThrough();
        world.place(rob, location);
      });

      it('should put Rob in a tile', function() {
        expect(world.tiles[location.x][location.y]).toBe(rob);
      });

      it('should default direction to north', function() {
        expect(rob.direction).toEqual(CardinalDirection.NORTH);
      });

      it("should set rob's location", function() {
        expect(rob.location).toEqual(location);
      });

      it('should not log an error', function() {
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should add rob to worldly things', function() {
        var allMyRobs = _.filter(world.things, function(thing) { return thing === rob; });
        expect(allMyRobs.length).toEqual(1);
      });

      it('if rob is already placed, it should not add two robs to worldly things', function() {
        var anotherLocation = {x: 2, y: 2};
        world.place(rob, anotherLocation);
        var allMyRobs = _.filter(world.things, function(thing) { return thing == rob; });
        expect(allMyRobs.length).toEqual(1);
      });

      describe("when there is a thing in the target tile", function () {
        var aThing;
        beforeEach(function () {
          aThing = { a: "thing" };
          world.place(aThing, location);
        });

        it("should remove the thing in that tile from the world", function () {
          expect(world.contains(aThing)).toBe(true);
          world.place(rob, location);
          expect(world.contains(aThing)).toBe(false);
        });
      });
    });

    describe('in a tile outside the world', function() {
      var outsideTheWorld = {x: -1, y: -1};

      describe('and thing already has prior location', function() {
        var robsOldLocation;

        beforeEach(function() {
          robsOldLocation = {x: 1, y: 1};
          world.place(rob, robsOldLocation);
          world.place(rob, outsideTheWorld);
        });

        it("do nothing", function() {
          expect(world.tiles[robsOldLocation.x][robsOldLocation.y]).toEqual(rob);
          expect(world.tiles[outsideTheWorld.x]).toBeFalsy();
          expect(rob.location).toEqual(robsOldLocation);
        });
      });

      describe('and thing is being added to the world', function() {
        it("should throw an error", function() {
          function thisShouldThrow() {
            world.place(rob, outsideTheWorld);
          }
          expect(thisShouldThrow).toThrow();
        });

        it('should not add rob to worldly things', function() {
          try {
            world.place(rob, outsideTheWorld);
          }
          catch(e) {
            // ignore
          }
          finally {
            expect(world.things).not.toContain(rob);
          }
        });
      });
    });
  });

  describe("#remove", function() {
    var location;
    beforeEach(function() {
      location = {x: 1, y: 1};
      world.place(rob, location);
      world.remove(rob);
    });

    it("should remove the thing from the tile", function() {
      expect(world.getThingAt(location)).toBeUndefined();
    });

    it("should remove the thing from the things", function () {
      expect(world.things).not.toContain(rob);
    });

    it("should unset the location of the thing", function () {
      expect(rob.location).toBeUndefined();
    });
  });

  describe("#isLocationInsideWorld", function() {
    var x, y;

    describe("for an y within the world bounds", function() {
      beforeEach(function() {
        y = singletonContext.randomNumberGenerator.random(0, 7);
      });

      it("should return false for an x less than zero", function() {
        expect(world.isLocationInsideWorld({x: -1, y: y})).toBeFalsy();
      });

      it("should return true for an x within the world bounds", function() {
        expect(world.isLocationInsideWorld({x: singletonContext.randomNumberGenerator.random(0, 7), y: y})).toBeTruthy();
      });

      it("should return false for an x greater than width", function() {
        expect(world.isLocationInsideWorld({x: world.width, y: y})).toBeFalsy();
      });
    });

    describe("for an x within the world bounds", function() {
      beforeEach(function() {
        x = singletonContext.randomNumberGenerator.random(0, 7);
      });

      it("should return false for a y less than zero", function() {
        expect(world.isLocationInsideWorld({x: x, y: -1})).toBeFalsy();
      });

      it("should return true for a y within the world bounds", function() {
        expect(world.isLocationInsideWorld({x: x, y: singletonContext.randomNumberGenerator.random(0, 7)})).toBeTruthy();
      });

      it("should return true for a y greater than height", function() {
        expect(world.isLocationInsideWorld({x: x, y: world.height})).toBeFalsy();
      });
    });

  });

  describe("#getTileInDirection", function() {
    var relativeDirection;

    beforeEach(function() {
      rob.location = {x: 1, y:1};
    });

    describe("RelativeDirection.FORWARD", function () {
      beforeEach(function() {
        relativeDirection = RelativeDirection.FORWARD;  
      });

      it("should return coordinates for the tile to the WEST of Rob when Rob is facing WEST", function() {
        rob.direction = CardinalDirection.WEST;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x:0, y: 1});
      });

      it("should return coordinates for the tile to the EAST of Rob when Rob is facing EAST", function() {
        rob.direction = CardinalDirection.EAST;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 2, y: 1});
      });

      it("should return coordinates for the tile to the NORTH of Rob when Rob is facing NORTH", function() {
        rob.direction = CardinalDirection.NORTH;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 0});
      });

      it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing SOUTH", function() {
        rob.direction = CardinalDirection.SOUTH;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 2});
      });  
    });

    describe("RelativeDirection.LEFT", function () {
      beforeEach(function() {
        relativeDirection = RelativeDirection.LEFT;
      });

      it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing WEST", function() {
        rob.direction = CardinalDirection.WEST;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x:1, y: 2});
      });

      it("should return coordinates for the tile to the NORTH of Rob when Rob is facing ESAT", function() {
        rob.direction = CardinalDirection.EAST;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 1, y: 0});
      });

      it("should return coordinates for the tile to the WEST of Rob when Rob is facing NORTH", function() {
        rob.direction = CardinalDirection.NORTH;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 0, y: 1});
      });

      it("should return coordinates for the tile to the EAST of Rob when Rob is facing SOUTH", function() {
        rob.direction = CardinalDirection.SOUTH;
        expect(world.getTileInDirection(relativeDirection, rob)).toEqual({x: 2, y: 1});
      });
    });
  });

  describe("#getFreeTiles", function () {
    beforeEach(function () {
      world.height = 2;
      world.width = 2;
    });

    it("should return a list of empty tiles", function () {
      var freeTiles = world.getFreeTiles();
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
        expect(world.getFreeTiles()).toMatchArray([
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
          expect(world.getFreeTiles()).toMatchArray([
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
