describe("World", function() {
  var world, rob;

  beforeEach(function() {
    world = new World();
    rob = new Critter();
    world.place(rob, 1,1);
  });

  describe("#update", function(){
    it("should call getAction on all critters", function(){
      spyOn(rob, "getAction");
      world.update();
      expect(rob.getAction).toHaveBeenCalled();
    });

    describe("performing the MOVE_FORWARD action for a critter", function(){
      beforeEach(function() {
        world.place(rob, 4, 0);
      });

      describe('when there is an empty tile in front of the critter', function() {
        it("should remove the critter from the tile it is in");

        it("should add the critter to the tile in front of the previous one")
      });

      describe('when there is the edge of the world in front of the critter', function() {
        it('should not move Rob');
      });
    });
  });

  describe("#place", function() {
    it('should put Rob in a tile', function() {
      var x = Math.floor(Math.random() * 5);
      var y = Math.floor(Math.random() * 5);

      world.place(rob, x, y);
      expect(world.tiles[x][y]).toBe(rob);
    });

    it('should default direction to north');
  });

  describe("#findThingState", function() {
    it("should return a thing's state", function() {
      var aState = {
        location: { x: 1, y: 1},
        direction: CardinalDirection.WEST
      };

      world.thingStates.push({
        thing: rob,
        state: aState
      });
      expect(world.findThingState(rob)).toEqual(aState);
    })
  });

  describe("#getTileInDirection", function() {
    it("should return coordinates for the tile to the WEST of Rob when Rob is facing WEST", function() {
      world.thingStates = [getRobState(CardinalDirection.WEST)];
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x:0, y: 1});
    });

    it("should return coordinates for the tile to the EAST of Rob when Rob is facing ESAT", function() {
      world.thingStates = [getRobState(CardinalDirection.EAST)];
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 2, y: 1});
    });

    it("should return coordinates for the tile to the NORTH of Rob when Rob is facing NORTH", function() {
      world.thingStates = [getRobState(CardinalDirection.NORTH)];
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 1, y: 0});
    });

    it("should return coordinates for the tile to the SOUTH of Rob when Rob is facing SOUTH", function() {
      world.thingStates = [getRobState(CardinalDirection.SOUTH)];
      expect(world.getTileInDirection(RelativeDirection.FORWARD, rob)).toEqual({x: 1, y: 2});
    });

    var getRobState = function(direction){
      return {
        thing: rob,
        state: {
          location: {
            x: 1, y: 1
          },
          direction: direction
        }
      };
    };
  });
});