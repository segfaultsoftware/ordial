describe("CritterActuator", function() {
  var critterActuator, robsOriginalLocation, zoesOriginalLocation;
  var world, rob, worldNavigator;
  beforeEach(function() {
    rob = new Critter({genes: [['action', 'MOVE_FORWARD']], color: 'doesnotexist'});
    critterActuator = new CritterActuator();
    world = singletonContext.world = new World();
    worldNavigator = singletonContext.worldNavigator;
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
        expect(worldNavigator.getThingAt({x: 4, y: 0})).not.toEqual(resource);
      });

      it('should remove the resource from the world', function() {
        expect(world.contains(resource)).toBe(false);
      });

      it("should increase rob's mana by the resource's value", function() {
        expect(rob.vitals.mana).toEqual(originalMana + resource.manaPerServing);
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
        singletonContext.randomNumberGenerator.random(0,  CardinalDirection.ALL_DIRECTIONS.length - 1)
        ];
      rob.direction = robsDirection;
      originalWorldSize = world.things.length;
    });

    describe("left child", function() {
      beforeEach(function() {
        offspringLocation = worldNavigator.getTileInDirection(RelativeDirection.LEFT, rob);
      });

      describe("when there is an open position to the left", function() {
        var offspring;

        beforeEach(function() {
          singletonContext.randomNumberGenerator.stubRandom([
            0, // mutate
            0, // swap
            0, // swap
            1  // which side the clone pops up on
          ]);
          critterActuator.reproduceCritter(rob);
          offspring = worldNavigator.getThingAt(offspringLocation);
        });

        it("should create a critter to the left", function() {
          expect(offspring).not.toBeFalsy();
        });

        describe("offspring", function() {
          it("should have its parent's genes", function() {
            expect(offspring.genes).toEqual(rob.genes);
          });

          it("should have its parent's color", function() {
            expect(offspring.color).toEqual(rob.color);
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
          robsLocation = worldNavigator.getTileInDirection(RelativeDirection.LEFT, rob);
          world.place(rob, robsLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should not create a critter to the left", function() {
          expect(worldNavigator.getThingAt(robsLocation)).toEqual(rob);
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
          expect(worldNavigator.getThingAt(offspringLocation) instanceof Critter).toBe(true);
        });

        it("should remove the resource", function() {
          expect(world.contains(resource)).toBe(false);
        });

        it("should increment the critter's mana by the resource's mana", function() {
          var child = worldNavigator.getThingAt(offspringLocation);
          expect(child.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA + resource.manaPerServing);
        });
      });
    });

    describe("right child", function() {
      beforeEach(function() {
        offspringLocation = worldNavigator.getTileInDirection(RelativeDirection.RIGHT, rob);
      });

      describe("when there is an open position to the right", function() {
        var offspring, mutantGenes;

        beforeEach(function() {
          mutantGenes = [['action', 'TURN_LEFT']];
          spyOn(singletonContext.geneMutator, 'mutate')
            .and.returnValue(mutantGenes);
        });

        it("should create a critter to the right", function() {
          critterActuator.reproduceCritter(rob);
          offspring = worldNavigator.getThingAt(offspringLocation);
          expect(offspring).not.toBeFalsy();
        });

        describe("offspring", function() {
         it("should be oriented to the right of its parent", function() {
            
           critterActuator.reproduceCritter(rob);
          offspring = worldNavigator.getThingAt(offspringLocation);
           expect(offspring.direction).toEqual(
              CardinalDirection.getDirectionAfterRotation(rob.direction, RelativeDirection.RIGHT)
            );
          });

          describe("half of the time", function(){
            beforeEach(function(){
              singletonContext.randomNumberGenerator.stubRandom([0]);
              critterActuator.reproduceCritter(rob);
              offspring = worldNavigator.getThingAt(offspringLocation);
            });
            
            it("should have its parent's genes", function() {
              expect(offspring.genes).toEqual(rob.genes);
            });

            it("should have its parent's color", function() {
              expect(offspring.color).toEqual(rob.color);
            });
          });
          
          describe("the other half of the the time", function(){
            beforeEach(function(){
              singletonContext.randomNumberGenerator.stubRandom([1]);
              critterActuator.reproduceCritter(rob);
              offspring = worldNavigator.getThingAt(offspringLocation);
            });
            
            it("should have a mutated version of its parent's mind", function() {
              expect(offspring.genes).toEqual(mutantGenes);
              expect(offspring.getActions()).toEqual(Critter.Actions.TURN_LEFT);
            });

            it("should not have its parent's color", function() {
              expect(offspring.color).not.toEqual(rob.color);
            });
          });
        });
      });

      describe("when there is a critter to the right", function() {
        var robsLocation;

        beforeEach(function() {
          robsLocation = worldNavigator.getTileInDirection(RelativeDirection.RIGHT, rob);
          world.place(rob, robsLocation);
          critterActuator.reproduceCritter(rob);
        });

        it("should not create a critter to the right", function() {
          expect(worldNavigator.getThingAt(robsLocation)).toEqual(rob);
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
          expect(worldNavigator.getThingAt(offspringLocation) instanceof Critter).toBe(true);
        });

        it("should remove the resource", function() {
          expect(world.contains(resource)).toBe(false);
        });
      });
    });
  });

  describe('#moveForwardAndEatCritter', function() {
    var sigfried;
    
    describe('when there is nothing in the way', function() {
      beforeEach(function() {
        sigfried = new Critter();
        world.place(sigfried, {x:5, y:3});
      });
      it('moves a critter forward', function () {
        critterActuator.moveForwardAndEatCritter(sigfried);
        expect(sigfried.location).toEqual({x:5, y:2});
      });
    });
    
    describe("when there is a critter in the way", function(){
      var blockingCritter;
      beforeEach(function() {
        blockingCritter = new Critter();
        world.place(blockingCritter, {x:5, y:2});
        sigfried = new Critter();
        world.place(sigfried, {x:5, y:3});
      });
      
      it("does not eat live critters", function(){
        blockingCritter.vitals.mana = 100;
        sigfried.vitals.mana = 25;
        critterActuator.moveForwardAndEatCritter(sigfried);
        expect(sigfried.location).toEqual({x:5, y:3});
        expect(sigfried.vitals.mana).toEqual(25);
      });
      
      describe('when the blocking critter is dead', function (){
      beforeEach(function(){
        blockingCritter.vitals.mana = -1;
      });
      
      it('removes the corpse', function () {
        critterActuator.moveForwardAndEatCritter(sigfried);
        expect(world.contains(blockingCritter)).toBe(false);
      });
      
      it('moves a critter forward', function () {
        critterActuator.moveForwardAndEatCritter(sigfried);
        expect(sigfried.location).toEqual({x:5, y:2});
      });
      
      it('feeds the critter the nutritional value of the  dead critter', function() {
        var hungryMana = sigfried.vitals.mana;
        critterActuator.moveForwardAndEatCritter(sigfried);
        expect(sigfried.vitals.mana).toEqual(hungryMana + blockingCritter.manaPerServing);
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

  describe("#resetCounterOnCritter", function(){
    it("sets the vitals counter to the default value", function(){
      var anna = new Critter({ vitals: { counter: 10 } });
      
      expect(anna.vitals.counter).not.toBe(Critter.DEFAULT_STARTING_COUNTER);
      critterActuator.resetCounterOnCritter(anna);   
      expect(anna.vitals.counter).toBe(Critter.DEFAULT_STARTING_COUNTER);
    });
  });

  describe("#produceSound", function(){
    describe('when there is nothing in the way', function() {
      var sigfried;
      beforeEach(function() {
        sigfried = new Critter();
        world.place(sigfried, {x:5, y:3});
      });

      it('produces a sound on each side of the critter', function () {
        critterActuator.produceSound(sigfried);
        expect(worldNavigator.getThingAt({x: 5, y:2})).toEqual(jasmine.any(Sound));
        expect(worldNavigator.getThingAt({x: 4, y:3})).toEqual(jasmine.any(Sound));
        expect(worldNavigator.getThingAt({x: 6, y:3})).toEqual(jasmine.any(Sound));
        expect(worldNavigator.getThingAt({x: 5, y:4})).toEqual(jasmine.any(Sound));
      });
    });
  });
});
