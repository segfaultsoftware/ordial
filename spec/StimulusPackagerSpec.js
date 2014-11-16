describe("StimulusPackager", function () {
  var packager;

  beforeEach(function () {
    packager = new StimulusPackager();
  });

  describe("#package", function () {
    describe("package.thingInFrontOfMe", function () {
      var critter, world, critterLocation, thingLocation;

      beforeEach(function () {
        world = new World();

        critterLocation = {x: _.random(1, world.width - 2), //leave room for blocker
                           y: _.random(1, world.height - 2)};
        var critterDirection = _.sample(CardinalDirection.ALL_DIRECTIONS);
        critter = new Critter();
        critter.direction = critterDirection;

        world.place(critter, critterLocation);
      });

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
        beforeEach(function () {
          world.place(critter, {x:0, y: 2});
          critter.direction = CardinalDirection.WEST;
        });

        it("should be THE VOID", function () {
          var stimuli = packager.package(world, critter);
          expect(stimuli.thingInFrontOfMe).toBe(TheVoid);
        });
      });
    });
  });
});