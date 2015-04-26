describe("World", function() {
  var world, rob, zoe, kim, joe, stimulusPackager;

  beforeEach(function() {
    stimulusPackager = jasmine.createSpyObj('packager', ['package']);
    window.singletonContext.stimulusPackager = stimulusPackager;
    world = singletonContext.world = new World();
    rob = new Critter({mind: new CritterMind({action: Critter.Actions.MOVE_FORWARD })});
    zoe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_LEFT })});
    kim = new Critter({mind: new CritterMind({action: Critter.Actions.REPRODUCE })});
    joe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_RIGHT })});
  });

  describe("#update", function(){
    var critterActuator;
    beforeEach(function() {
      critterActuator = singletonContext.critterActuator = new CritterActuator();
      window.singletonContext.randomNumberGenerator.seedrandom('foo');
      var robsOriginalLocation, zoesOriginalLocation, kimsOriginalLocation, joesOriginalLocation;
      robsOriginalLocation = {x: 1, y: 1};
      zoesOriginalLocation = {x: 4, y: 4};
      kimsOriginalLocation = {x: 7, y: 7};
      joesOriginalLocation = {x: 7, y: 2};
      world.place(rob, robsOriginalLocation);
      world.place(zoe, zoesOriginalLocation);
      world.place(kim, kimsOriginalLocation);
      world.place(joe, joesOriginalLocation);
    });

    it("should call getActions on all critters", function(){
      spyOn(rob, "getActions").and.callThrough();
      spyOn(zoe, "getActions").and.callThrough();
      spyOn(kim, "getActions").and.callThrough();
      world.update();
      expect(rob.getActions).toHaveBeenCalled();
      expect(zoe.getActions).toHaveBeenCalled();
      expect(kim.getActions).toHaveBeenCalled();
    });

    it("should get the critter's action based on its stimuli", function () {
      world = new World();
      var somethingInteresting = "Some stimulating conversation";
      stimulusPackager.package.and.returnValue(somethingInteresting);

      rob = new Critter();
      world.place(rob, {x:1, y:1});
      spyOn(rob, "getActions").and.callThrough();
      world.update();
      expect(stimulusPackager.package).toHaveBeenCalledWith(world, rob);
      expect(rob.getActions).toHaveBeenCalledWith(somethingInteresting);
    });

    describe("when the getActions is MOVE_FORWARD", function() {
      it("should call #moveCritterForward", function() {
        spyOn(critterActuator, 'moveCritterForward');
        world.update();
        expect(critterActuator.moveCritterForward).toHaveBeenCalledWith(rob);
      });
    });

    describe("when the getActions is TURN_LEFT", function () {
      it("should call #turnCritterLeft", function () {
        spyOn(critterActuator, 'turnCritterLeft');
        world.update();
        expect(critterActuator.turnCritterLeft).toHaveBeenCalledWith(zoe);
      });
    });

    describe("when the getActions is TURN_RIGHT", function () {
      it("should call #turnCritterRight", function () {
        spyOn(critterActuator, 'turnCritterRight');
        world.update();
        expect(critterActuator.turnCritterRight).toHaveBeenCalledWith(joe);
      });
    });

    describe("when the getActions is REPRODUCE", function () {
      it("should call #reproduceCritter", function () {
        kim.vitals.mana = Critter.Actions.REPRODUCE.cost + 1;
        spyOn(critterActuator, 'reproduceCritter');
        world.update();
        expect(critterActuator.reproduceCritter).toHaveBeenCalledWith(kim);
      });
    });

    describe("when the getActions is INCREMENT_COUNTER", function () {
      var vanderbilt;
      beforeEach(function () {
        vanderbilt = new Critter({mind: new CritterMind({action: Critter.Actions.INCREMENT_COUNTER})});
        world.place(vanderbilt, {x:0, y:0});
        spyOn(critterActuator, 'incrementCounterOnCritter');
      });

      it("should call #incrementCounterOnCritter", function () {
        world.update();
        expect(critterActuator.incrementCounterOnCritter).toHaveBeenCalledWith(vanderbilt);
      });
    });

    describe("when the getActions is DECREMENT_COUNTER", function () {
      var coleman;
      beforeEach(function () {
        coleman = new Critter({mind: new CritterMind({action: Critter.Actions.DECREMENT_COUNTER})});
        world.place(coleman, {x:0, y:0});
        spyOn(critterActuator, 'decrementCounterOnCritter');
      });

      it("should call #decrementCounterOnCritter", function () {
        world.update();
        expect(critterActuator.decrementCounterOnCritter).toHaveBeenCalledWith(coleman);
      });
    });

    it("should update the critters' mana", function () {
      world.update();
      expect(zoe.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.TURN_LEFT.cost);
      expect(rob.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.MOVE_FORWARD.cost);
      expect(kim.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.REPRODUCE.cost);
    });

    describe("when the critter does not have enough mana to perform the action", function(){
      it("should remove the critters", function() {
        rob.vitals.mana = 1;
        world.update();
        expect(world.things).not.toContain(rob);
        expect(world.things).toContain(zoe);
        expect(world.things).not.toContain(kim);
      });

      it("should not perform the action", function(){
        rob.vitals.mana = 1;
        spyOn(critterActuator, 'moveCritterForward');
        world.update();
        expect(critterActuator.moveCritterForward).not.toHaveBeenCalledWith(rob);
      });

    });
    describe("when there are multiple actions", function(){
      var fred, originalMana;
      beforeEach(function () {
        fred = new Critter();
        originalMana = Critter.Actions.REPRODUCE.cost + Critter.Actions.MOVE_FORWARD.cost + 1;
        fred.vitals.mana = originalMana;
        spyOn(fred, "getActions").and.returnValue([Critter.Actions.MOVE_FORWARD, Critter.Actions.REPRODUCE]);
        world.place(fred, {x:5, y:5});
      });

      it("applies both actions", function () {
        spyOn(critterActuator, "moveCritterForward");
        spyOn(critterActuator, "reproduceCritter");
        world.update();
        expect(critterActuator.moveCritterForward).toHaveBeenCalledWith(fred);
        expect(critterActuator.reproduceCritter).toHaveBeenCalledWith(fred);
      });

      it("applies both costs", function(){
        world.update();
        expect(fred.vitals.mana).toEqual(1);
      });
    });
  });


  describe("#place", function() {
    var location;

    describe('in a tile within the world', function() {
      beforeEach(function() {
        location = {
          x: Math.floor(window.singletonContext.randomNumberGenerator.random() * 5),
          y: Math.floor(window.singletonContext.randomNumberGenerator.random() * 5)
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
        y = Math.floor(window.singletonContext.randomNumberGenerator.random() * 8);
      });

      it("should return false for an x less than zero", function() {
        expect(world.isLocationInsideWorld({x: -1, y: y})).toBeFalsy();
      });

      it("should return true for an x within the world bounds", function() {
        expect(world.isLocationInsideWorld({x: Math.floor(window.singletonContext.randomNumberGenerator.random() * 8), y: y})).toBeTruthy();
      });

      it("should return false for an x greater than width", function() {
        expect(world.isLocationInsideWorld({x: world.width, y: y})).toBeFalsy();
      });
    });

    describe("for an x within the world bounds", function() {
      beforeEach(function() {
        x = Math.floor(window.singletonContext.randomNumberGenerator.random() * 8);
      });

      it("should return false for a y less than zero", function() {
        expect(world.isLocationInsideWorld({x: x, y: -1})).toBeFalsy();
      });

      it("should return true for a y within the world bounds", function() {
        expect(world.isLocationInsideWorld({x: x, y: Math.floor(window.singletonContext.randomNumberGenerator.random() * 8)})).toBeTruthy();
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
