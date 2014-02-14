describe("World", function() {
  var world, rob;

  beforeEach(function() {
    world = new World();
    rob = new Critter();
  });

  describe("#update", function(){
    var originalLocation;
    beforeEach(function() {
      originalLocation = {x: 1, y: 1};
      world.place(rob, originalLocation.x, originalLocation.y);
    });

    it("should call getAction on all critters", function(){
      spyOn(rob, "getAction");
      world.update();
      expect(rob.getAction).toHaveBeenCalled();
    });

    describe("performing the MOVE_FORWARD action for a critter", function(){
      describe('when there is an empty tile in front of the critter', function() {
        beforeEach(function() {
          world.place(rob, 4, 1);
          world.update();
        });

        it("should remove the critter from the tile it is in", function(){
          expect(world.tiles[4][1]).not.toBe(rob);
        });

        it("should add the critter to the tile in front of the previous one", function() {
          expect(world.tiles[4][0]).toBe(rob);
          expect(rob.location).toEqual({x:4, y:0});
        })
      });

      describe("when there is another critter in front of rob", function() {
        var zoe;

        beforeEach(function() {
          zoe = new Critter();
          world.place(rob, 4, 1);
          world.place(zoe, 4, 0);
          world.update();
        });

        it('should not move Rob', function(){
          expect(world.tiles[4][1]).toBe(rob);
          expect(rob.location).toEqual({x:4, y:1});
        });

        it('should not move Zoe', function() {
          expect(world.tiles[4][0]).toBe(zoe);
          expect(zoe.location).toEqual({x:4, y:0});
        });
      });

      describe('when there is the edge of the world in front of the critter', function() {
        beforeEach(function() {
          world.place(rob, 4, 0);
          world.update();
        });

        it('should not move Rob', function(){
          expect(rob.location).toEqual({x:4, y:0});
        });
      });
    });
  });

  describe("#place", function() {
    var x, y;

    describe('in a tile within the world', function() {
      beforeEach(function() {
        x = Math.floor(Math.random() * 5);
        y = Math.floor(Math.random() * 5);

        spyOn(console, "error").and.callThrough();
        world.place(rob, x, y);
      });

      it('should put Rob in a tile', function() {
        expect(world.tiles[x][y]).toBe(rob);
      });

      it('should default direction to north', function() {
        expect(rob.direction).toEqual(CardinalDirection.NORTH);
      });

      it("should set rob's location", function() {
        expect(rob.location.x).toEqual(x);
        expect(rob.location.y).toEqual(y);
      });

      it('should not log an error', function() {
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should add rob to worldly things', function() {
        var allMyRobs = _.filter(world.things, function(thing) { return thing === rob; });
        expect(allMyRobs.length).toEqual(1);
      });

      it('if rob is already placed, it should not add two robs to worldly things', function() {
        world.place(rob, x + 1, y + 1);
        var allMyRobs = _.filter(world.things, function(thing) { return thing == rob; });
        expect(allMyRobs.length).toEqual(1);
      });
    });

    describe('in a tile outside the world', function() {
      beforeEach(function() {
        x = -1;
        y = -1;

        spyOn(console, "error").and.callThrough();
        world.place(rob, x, y);
      });

      it("should log an error and do nothing", function() {
        expect(console.error).toHaveBeenCalled();
        expect(world[x]).toBeUndefined();
        expect(rob.location).toBeUndefined();
      });

      it('should not add rob to worldly things', function() {
        expect(world.things).not.toContain(rob);
      });
    });
  });

  describe("#remove", function() {
    beforeEach(function() {
      world.things.push(rob);
      world.remove(rob);
    });

    it("should remove the thing from the tile", function() {
      expect(world.things).not.toContain(rob);
    });
  });

  describe("#isLocationInsideWorld", function() {
    var x, y;

    describe("for an y within the world bounds", function() {
      beforeEach(function() {
        y = Math.floor(Math.random() * 8);
      });

      it("should return false for an x less than zero", function() {
        expect(world.isLocationInsideWorld(-1, y)).toBeFalsy();
      });

      it("should return true for an x within the world bounds", function() {
        expect(world.isLocationInsideWorld(Math.floor(Math.random() * 8), y)).toBeTruthy();
      });

      it("should return false for an x greater than width", function() {
        expect(world.isLocationInsideWorld(world.width, y)).toBeFalsy();
      });
    });

    describe("for an x within the world bounds", function() {
      beforeEach(function() {
        x = Math.floor(Math.random() * 8);
      });

      it("should return false for a y less than zero", function() {
        expect(world.isLocationInsideWorld(x, -1)).toBeFalsy();
      });

      it("should return true for a y within the world bounds", function() {
        expect(world.isLocationInsideWorld(x, Math.floor(Math.random() * 8))).toBeTruthy();
      });

      it("should return true for a y greater than height", function() {
        expect(world.isLocationInsideWorld(x, world.height)).toBeFalsy();
      });
    });

  });

  describe("#getTileInDirection", function() {
    beforeEach(function() {
      rob.location = {x: 1, y:1};
    });
    it("should return coordinates for the tile to the WEST of Rob when Rob is facing WEST", function() {
      rob.direction = CardinalDirection.WEST;
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x:0, y: 1});
    });

    it("should return coordinates for the tile to the EAST of Rob when Rob is facing ESAT", function() {
      rob.direction = CardinalDirection.EAST;
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 2, y: 1});
    });

    it("should return coordinates for the tile to the NORTH of Rob when Rob is facing NORTH", function() {
      rob.direction = CardinalDirection.NORTH;
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 1, y: 0});
    });

    it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing SOUTH", function() {
      rob.direction = CardinalDirection.SOUTH;
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 1, y: 2});
    });
  });
});
