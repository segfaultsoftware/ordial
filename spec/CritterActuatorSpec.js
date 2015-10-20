describe("CritterActuator", function() {
  var critterActuator, robsOriginalLocation, zoesOriginalLocation;
  var world, rob;
  beforeEach(function() {
    rob = new Critter({genes: [['action', 'MOVE_FORWARD']]});
    critterActuator = new CritterActuator();
    world = singletonContext.world = new World();
    world.place(rob, {x: 4, y: 1});
  });

  describe("#moveCritterForward", function() {
    describe('when there is an empty tile in front of the critter', function() {
      beforeEach(function() {
        world.place(rob, {x: 4, y: 1});
        critterActuator.moveCritterForward(rob);
      });

      it("should remove the critter from the tile it is in", function() {
        expect(world.tiles[4][1]).not.toBe(rob);
      });

      it("should add the critter to the tile in front of the previous one", function() {
        expect(world.tiles[4][0]).toBe(rob);
        expect(rob.location).toEqual({x: 4, y: 0});
      })
    });

    describe("when there is another critter in front of rob", function() {
      var zoe;
      beforeEach(function() {
        zoe = new Critter();
        world.place(rob, {x: 4, y: 1});
        world.place(zoe, {x: 4, y: 0});
        critterActuator.moveCritterForward(rob);
      });

      it('should not move Rob', function() {
        expect(world.tiles[4][1]).toBe(rob);
        expect(rob.location).toEqual({x: 4, y: 1});
      });

      it('should not move Zoe', function() {
        expect(world.tiles[4][0]).toBe(zoe);
        expect(zoe.location).toEqual({x: 4, y: 0});
      });
    });

    describe('when there is the edge of the world in front of the critter', function() {
      beforeEach(function() {
        world.place(rob, {x: 4, y: 0});
        critterActuator.moveCritterForward(rob);
      });

      it('should not move Rob', function() {
        expect(rob.location).toEqual({x: 4, y: 0});
      });
    });

    describe("when there is a resource in front of the critter", function() {
      var resource, originalMana, costOfTheMove;
      beforeEach(function() {
        resource = new Resource();
        originalMana = rob.vitals.mana;
        world.place(rob, {x: 4, y: 1});
        world.place(resource, {x: 4, y: 0});
        critterActuator.moveCritterForward(rob);
      });

      it('should move Rob into the space', function() {
        expect(rob.location).toEqual({x: 4, y: 0});
      });

      it('should remove the resource from the tile', function() {
        expect(world.getThingAt({x: 4, y: 0})).not.toEqual(resource);
      });

      it('should remove the resource from the world', function() {
        expect(world.contains(resource)).toBe(false);
      });

      it("should increase rob's mana by the resource's value", function() {
        expect(rob.vitals.mana).toEqual(originalMana + resource.mana);
      });
    });
  });

  describe("#turnCritterLeft", function() {
    it("should update the critter's cardinal direction", function() {
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      critterActuator.turnCritterLeft(rob);
      expect(rob.direction).toBe(CardinalDirection.WEST);
      critterActuator.turnCritterLeft(rob);
      expect(rob.direction).toBe(CardinalDirection.SOUTH);
      critterActuator.turnCritterLeft(rob);
      expect(rob.direction).toBe(CardinalDirection.EAST);
      critterActuator.turnCritterLeft(rob);
      expect(rob.direction).toBe(CardinalDirection.NORTH);
    });

    it("should not move the critter", function() {
      world.place(rob, {x: 4, y: 4});
      critterActuator.turnCritterLeft(rob);
      expect(world.tiles[4][4]).toBe(rob);
      expect(rob.location).toEqual({x: 4, y: 4});
    });
  });

  describe("#turnCritterRight", function() {
    it("should update the critter's cardinal direction", function() {
      expect(rob.direction).toBe(CardinalDirection.NORTH);
      critterActuator.turnCritterRight(rob);
      expect(rob.direction).toBe(CardinalDirection.EAST);
      critterActuator.turnCritterRight(rob);
      expect(rob.direction).toBe(CardinalDirection.SOUTH);
      critterActuator.turnCritterRight(rob);
      expect(rob.direction).toBe(CardinalDirection.WEST);
      critterActuator.turnCritterRight(rob);
      expect(rob.direction).toBe(CardinalDirection.NORTH);
    });

    it("should not move the critter", function() {
      world.place(rob, {x: 7, y: 2});
      critterActuator.turnCritterRight(rob);
      expect(world.tiles[7][2]).toBe(rob);
      expect(rob.location).toEqual({x: 7, y: 2});
    });
  });

  describe("#reproduceCritter", function() {
    var offspringLocation, originalWorldSize;
    beforeEach(function() {
      var robsDirection = CardinalDirection.ALL_DIRECTIONS[
        Math.floor(window.singletonContext.randomNumberGenerator.random() * CardinalDirection.ALL_DIRECTIONS.length)
        ];
      rob.direction = robsDirection;
      originalWorldSize = world.things.length;
    });

    describe("left child", function() {
      beforeEach(function() {
        offspringLocation = world.getTileInDirection(RelativeDirection.LEFT, rob);
      });

      describe("when there is an open position to the left", function() {
        var offspring;

        beforeEach(function() {
          critterActuator.reproduceCritter(rob);
          offspring = world.getThingAt(offspringLocation);
        });

        it("should create a critter to the left", function() {
          expect(offspring).not.toBeFalsy();
        });

        describe("offspring", function() {
          it("should have its parent's genes", function() {
            expect(offspring.genes).toEqual(rob.genes);
          });

          it("should be oriented to the left of its parent", function() {
            expect(offspring.direction).toEqual(
              CardinalDirection.getDirectionAfterRotation(rob.direction, RelativeDirection.LEFT)
            );
          });
        });
      });

      describe("when there is a critter to the left", function() {
        var robsLocation;

        beforeEach(function() {
          robsLocation = world.getTileInDirection(RelativeDirection.LEFT, rob);
          world.place(rob, robsLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should not create a critter to the left", function() {
          expect(world.getThingAt(robsLocation)).toEqual(rob);
        });
      });

      describe("when the edge of the world is to the left", function() {
        var placeSpy;
        beforeEach(function() {
          rob.direction = CardinalDirection.NORTH;
          world.place(rob, {x: 0, y: 4});
          placeSpy = spyOn(world, "place");
        });

        it("should not place a critter to the left", function() {
          critterActuator.reproduceCritter(rob);
          expect(placeSpy.calls.count()).toEqual(1);
        });
      });

      describe("when there is a resource to the left", function() {
        var resource;
        beforeEach(function() {
          resource = new Resource();
          world.place(resource, offspringLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should create a critter to the left", function() {
          expect(world.getThingAt(offspringLocation) instanceof Critter).toBe(true);
        });

        it("should remove the resource", function() {
          expect(world.contains(resource)).toBe(false);
        });

        it("should increment the critter's mana by the resource's mana", function() {
          var child = world.getThingAt(offspringLocation);
          expect(child.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA + resource.mana);
        });
      });
    });

    describe("right child", function() {
      beforeEach(function() {
        offspringLocation = world.getTileInDirection(RelativeDirection.RIGHT, rob);
      });

      describe("when there is an open position to the right", function() {
        var offspring, mutantGenes;

        beforeEach(function() {
          mutantGenes = [['action', 'TURN_LEFT']];
          spyOn(singletonContext.geneMutator, 'mutate')
            .and.returnValue(mutantGenes);

          critterActuator.reproduceCritter(rob);
          offspring = world.getThingAt(offspringLocation);
        });

        it("should create a critter to the right", function() {
          expect(offspring).not.toBeFalsy();
        });

        describe("offspring", function() {
          it("should have a mutated version of its parent's mind", function() {
            expect(offspring.genes).toEqual(mutantGenes);
            expect(offspring.getActions()).toEqual(Critter.Actions.TURN_LEFT);

          });

          it("should be oriented to the right of its parent", function() {
            expect(offspring.direction).toEqual(
              CardinalDirection.getDirectionAfterRotation(rob.direction, RelativeDirection.RIGHT)
            );
          });
        });
      });

      describe("when there is a critter to the right", function() {
        var robsLocation;

        beforeEach(function() {
          robsLocation = world.getTileInDirection(RelativeDirection.RIGHT, rob);
          world.place(rob, robsLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should not create a critter to the right", function() {
          expect(world.getThingAt(robsLocation)).toEqual(rob);
        });
      });

      describe("when the edge of the world is to the right", function() {
        var placeSpy;
        beforeEach(function() {
          rob.direction = CardinalDirection.WEST;
          world.place(rob, {x: 4, y: 0});
          placeSpy = spyOn(world, "place");
        });

        it("should not place a critter to the left", function() {
          critterActuator.reproduceCritter(rob);
          expect(placeSpy.calls.count()).toEqual(1);
        });
      });

      describe("when there is a resource to the right", function() {
        var resource;
        beforeEach(function() {
          resource = new Resource();
          world.place(resource, offspringLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should create a critter to the right", function() {
          expect(world.getThingAt(offspringLocation) instanceof Critter).toBe(true);
        });

        it("should remove the resource", function() {
          expect(world.contains(resource)).toBe(false);
        });
      });
    });
  });

  describe("#incrementCounterOnCritter", function() {
    var anna;
    beforeEach(function() {
      anna = new Critter();
    });

    it("should add one to the vitals.counter stat", function() {
      expect(anna.vitals.counter).toBe(Critter.DEFAULT_STARTING_COUNTER);
      critterActuator.incrementCounterOnCritter(anna);
      expect(anna.vitals.counter).toBe(Critter.DEFAULT_STARTING_COUNTER + 1);
    });
  });

  describe("#decrementCounterOnCritter", function() {
    var anna;
    beforeEach(function() {
      anna = new Critter();
    });

    it("should subtract one to the vitals.counter stat", function() {
      expect(anna.vitals.counter).toBe(Critter.DEFAULT_STARTING_COUNTER);
      critterActuator.decrementCounterOnCritter(anna);
      expect(anna.vitals.counter).toBe(Critter.DEFAULT_STARTING_COUNTER - 1);
    });
  });


});
