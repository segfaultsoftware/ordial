describe("World", function() {
  var world, rob, zoe;

  beforeEach(function() {
    world = new World();
    rob = new Critter({mind: new CritterMind(Critter.Actions.MOVE_FORWARD)});
    zoe = new Critter({mind: new CritterMind(Critter.Actions.TURN_LEFT)});
  });

  describe("#update", function(){
    beforeEach(function() {
      var robsOriginalLocation, zoesOriginalLocation;
      robsOriginalLocation = {x: 1, y: 1};
      zoesOriginalLocation = {x: 4, y: 4};
      world.place(rob, robsOriginalLocation.x, robsOriginalLocation.y);
      world.place(zoe, zoesOriginalLocation.x, zoesOriginalLocation.y);
    });

    it("should call getAction on all critters", function(){
      spyOn(rob, "getAction");
      spyOn(zoe, "getAction");
      world.update();
      expect(rob.getAction).toHaveBeenCalled();
      expect(zoe.getAction).toHaveBeenCalled();
    });

    describe("when the getAction is MOVE_FORWARD", function() {
      it("should call #moveCritterForward", function() {
        spyOn(world, 'moveCritterForward');
        world.update();
        expect(world.moveCritterForward).toHaveBeenCalledWith(rob);
      });
    });

    describe("when the getAction is TURN_LEFT", function () {
      it("should call #turnCritterLeft", function () {
        spyOn(world, 'turnCritterLeft');
        world.update();
        expect(world.turnCritterLeft).toHaveBeenCalledWith(zoe);
      });
    });
  });

  describe("critter actions", function(){
    var robsOriginalLocation, zoesOriginalLocation;
    beforeEach(function() {
      robsOriginalLocation = {x: 1, y: 1};
      zoesOriginalLocation = {x: 4, y: 4};
      world.place(rob, robsOriginalLocation.x, robsOriginalLocation.y);
      world.place(zoe, zoesOriginalLocation.x, zoesOriginalLocation.y);
    });

    describe("#moveCritterForward", function() {
      describe('when there is an empty tile in front of the critter', function() {
        beforeEach(function() {
          world.place(rob, 4, 1);
          world.moveCritterForward(rob);
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
        beforeEach(function() {
          world.place(rob, 4, 1);
          world.place(zoe, 4, 0);
          world.moveCritterForward(rob);
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
          world.moveCritterForward(rob);
        });

        it('should not move Rob', function(){
          expect(rob.location).toEqual({x:4, y:0});
        });
      });
    });

    describe("#turnCritterLeft", function() {
      it("should update the critter's cardinal direction", function () {
        expect(zoe.direction).toBe(CardinalDirection.NORTH);
        world.turnCritterLeft(zoe);
        expect(zoe.direction).toBe(CardinalDirection.WEST);
        world.turnCritterLeft(zoe);
        expect(zoe.direction).toBe(CardinalDirection.SOUTH);
        world.turnCritterLeft(zoe);
        expect(zoe.direction).toBe(CardinalDirection.EAST);
        world.turnCritterLeft(zoe);
        expect(zoe.direction).toBe(CardinalDirection.NORTH);
      });

      it("should not move the critter", function () {
        var oldLocation = _.extend(zoesOriginalLocation);
        world.update();
        expect(world.tiles[4][4]).toBe(zoe);
        expect(zoe.location).toEqual(oldLocation);
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
