describe("StimulusPackager", function () {
  var packager;

  beforeEach(function () {
    packager = new StimulusPackager();
  });

  describe("#package", function () {
    describe("package.thingInFrontOfMe", function () {
      describe("when there is a thing in front of the critter", function () {
        var stimuli, thing, critter, world, critterLocation, thingLocation;
        beforeEach(function () {
          world = new World();
          critterLocation = {x: Math.floor(Math.random() * (world.width - 1)),
                             y: Math.floor(Math.random() * (world.height - 1))};
          var critterDirection = _.sample(CardinalDirection.ALL_DIRECTIONS);
          critter = new Critter();
          critter.direction = critterDirection;

          thing = {};

          world.place(critter, critterLocation);
          thingLocation = world.getTileInDirection(RelativeDirection.FORWARD, critter);
          world.place(thing, thingLocation);
        });
        
        it("should add the thing to the payload", function () {
          stimuli = packager.package(world, critter);
          expect(stimuli.thingInFrontOfMe).toBe(thing);
        });
      });
    });
  });
});