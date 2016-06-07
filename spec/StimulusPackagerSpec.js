describe("StimulusPackager", function () {
  var packager;

  beforeEach(function () {
    packager = new StimulusPackager();
  });

  describe("#package", function () {
    var critter, world, critterLocation, thingLocation;

    function placeAndGetStimuli(critter, at, facing) {
      world.place(critter, at);
      critter.direction = facing;
      return packager.package(world, critter);
    }

    beforeEach(function () {
      world = new World();

      critterLocation = {x: singletonContext.randomNumberGenerator.random(1, world.width - 2), //leave room for blocker
        y: singletonContext.randomNumberGenerator.random(1, world.height - 2)};
      var critterDirection = singletonContext.randomNumberGenerator.sample(CardinalDirection.ALL_DIRECTIONS);
      critter = new Critter();
      critter.direction = critterDirection;

      world.place(critter, critterLocation);
    });

    describe("package.thingInFrontOfMe", function () {
      describe("when there is a blocker in front of the critter", function () {
        var blocker;

        beforeEach(function () {
          blocker = {};
          thingLocation = world.getTileInDirection(RelativeDirection.FORWARD, critter);
          world.place(blocker, thingLocation);
        });
        
        it("should be the blocker", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingInFrontOfMe).toBe(blocker);
        });
      });

      describe("when there's nothing in front of the critter", function () {
        it("should be null", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingInFrontOfMe).toBeNull();
        });
      });

      describe("when the critter is facing the edge of the map", function () {
        it("should be THE VOID", function () {
          var stimuli = placeAndGetStimuli(critter, {x: 0, y: 2}, CardinalDirection.WEST);
          expect(stimuli.thingInFrontOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: world.width - 1, y: 2}, CardinalDirection.EAST);
          expect(stimuli.thingInFrontOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: 0}, CardinalDirection.NORTH);
          expect(stimuli.thingInFrontOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: world.height - 1}, CardinalDirection.SOUTH);
          expect(stimuli.thingInFrontOfMe).toBe(TheVoid);
        });
      });
    });
    
    describe("package.thingToTheRightOfMe", function () {
      describe("when there is a blocker to the right of the critter", function () {
        var blocker;

        beforeEach(function () {
          blocker = new Rock();
          thingLocation = world.getTileInDirection(RelativeDirection.RIGHT, critter);
          world.place(blocker, thingLocation);
        });
        
        it("should be the blocker", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingToTheRightOfMe).toBe(blocker);
        });
      });

      describe("when there's nothing to the right of the critter", function () {
        it("should be null", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingToTheRightOfMe).toBeNull();
        });
      });

      describe("when the edge of the map is immediately to the critter's right", function () {
        it("should be THE VOID", function () {
          var stimuli = placeAndGetStimuli(critter, {x: 0, y: 2}, CardinalDirection.SOUTH);
          expect(stimuli.thingToTheRightOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: world.width - 1, y: 2}, CardinalDirection.NORTH);
          expect(stimuli.thingToTheRightOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: 0}, CardinalDirection.WEST);
          expect(stimuli.thingToTheRightOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: world.height - 1}, CardinalDirection.EAST);
          expect(stimuli.thingToTheRightOfMe).toBe(TheVoid);
        });
      });
    });

    describe("package.thingToTheLeftOfMe", function () {
      describe("when there is a blocker to the left of the critter", function () {
        var blocker;

        beforeEach(function () {
          blocker = new Rock();
          thingLocation = world.getTileInDirection(RelativeDirection.LEFT, critter);
          world.place(blocker, thingLocation);
        });
        
        it("should be the blocker", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingToTheLeftOfMe).toBe(blocker);
        });
      });

      describe("when there's nothing to the left of the critter", function () {
        it("should be null", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingToTheLeftOfMe).toBeNull();
        });
      });

      describe("when the edge of the map is immediately to the critter's left", function () {
        it("should be THE VOID", function () {
          var stimuli = placeAndGetStimuli(critter, {x: 0, y: 2}, CardinalDirection.NORTH);
          expect(stimuli.thingToTheLeftOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: world.width - 1, y: 2}, CardinalDirection.SOUTH);
          expect(stimuli.thingToTheLeftOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: 0}, CardinalDirection.EAST);
          expect(stimuli.thingToTheLeftOfMe).toBe(TheVoid);

          stimuli = placeAndGetStimuli(critter, {x: 2, y: world.height - 1}, CardinalDirection.WEST);
          expect(stimuli.thingToTheLeftOfMe).toBe(TheVoid);
        });
      });
    });
  });
});
