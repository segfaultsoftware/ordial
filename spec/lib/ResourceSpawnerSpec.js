var Resource = require("../../src/javascript/lib/models/Resource");
var World = require("../../src/javascript/lib/World");

describe("ResourceSpawner", function () {
  var spawner;
  describe("#spawn", function () {
    describe("when the spawn rate is 1", function () {
      beforeEach(function () {
        singletonContext.configuration.resourceSpawnRate = 1;
        spawner = new ResourceSpawner();
      });

      it("should place the resource on a random square", function () {
        var world = singletonContext.world;
        world.width = 2;
        world.height = 1;

        singletonContext.randomNumberGenerator.seedrandom(1);
        spawner.spawn();
        expect(world.getThingAt({x: 0, y: 0})).not.toBeNull();
        expect(world.getThingAt({x: 1, y: 0})).toBeNull();

        world = singletonContext.world = new World();
        world.width = 2;
        world.height = 1;

        singletonContext.randomNumberGenerator.seedrandom(3);
        spawner.spawn();
        expect(world.getThingAt({x: 1, y: 0})).not.toBeNull();
        expect(world.getThingAt({x: 0, y: 0})).toBeNull();
      });

      describe("when there are other things in the world", function () {
        var world;
        beforeEach(function () {
          world = singletonContext.world;
          world.width = 2;
          world.height = 1;

          singletonContext.randomNumberGenerator.seedrandom(1);
          world.place(new Resource(), {x: 0, y: 0});
        });

        it("should find a free spot to place the new resource", function () {
          spawner.spawn();
          expect(world.getThingAt({x: 0, y: 0})).not.toBeNull();
          expect(world.getThingAt({x: 1, y: 0})).not.toBeNull();
        });

        describe("when there is no space left in the world", function () {
          beforeEach(function () {
            world.place(new Resource(), {x: 1, y: 0});
          });

          it("should noop peacefully", function () {
            spawner.spawn();
            expect(world.getThingAt({x: 0, y: 0})).not.toBeNull();
            expect(world.getThingAt({x: 1, y: 0})).not.toBeNull();
          });
        });
      });
    });
  });
});