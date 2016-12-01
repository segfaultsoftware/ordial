describe("CritterUpdater", function(){
    var critterUpdater, world;
    beforeEach(function(){
      world = singletonContext.world = new World();

      critterUpdater = new CritterUpdater();
    });
    describe("#update", function(){
      var critterActuator;
      beforeEach(function() {
        critterActuator = singletonContext.critterActuator = new CritterActuator();
      });


      describe("when there are critters in the world", function(){
         var rob, zoe, kim, joe, ben;

          beforeEach(function() {
            rob = new Critter({mind: new CritterMind({action: Critter.Actions.MOVE_FORWARD })});
            zoe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_LEFT })});
            kim = new Critter({mind: new CritterMind({action: Critter.Actions.REPRODUCE })});
            joe = new Critter({mind: new CritterMind({action: Critter.Actions.TURN_RIGHT })});
            ben = new Critter({mind: new CritterMind({action: Critter.Actions.MOVE_FORWARD_AND_EAT_CRITTER })});
          });

          beforeEach(function(){
            singletonContext.randomNumberGenerator.seedrandom('foo');
            var robsOriginalLocation, zoesOriginalLocation, kimsOriginalLocation, joesOriginalLocation;
            robsOriginalLocation = {x: 1, y: 1};
            zoesOriginalLocation = {x: 4, y: 4};
            kimsOriginalLocation = {x: 7, y: 7};
            joesOriginalLocation = {x: 7, y: 2};
            world.place(rob, robsOriginalLocation);
            world.place(zoe, zoesOriginalLocation);
            world.place(kim, kimsOriginalLocation);
            world.place(joe, joesOriginalLocation);
            world.place(ben, {x: 5, y: 5});
        });

          it("should call getActions on all critters", function(){
            spyOn(rob, "getActions").and.callThrough();
            spyOn(zoe, "getActions").and.callThrough();
            spyOn(kim, "getActions").and.callThrough();
            critterUpdater.update();
            expect(rob.getActions).toHaveBeenCalled();
            expect(zoe.getActions).toHaveBeenCalled();
            expect(kim.getActions).toHaveBeenCalled();
          });

          describe("when the getActions is TURN_LEFT", function () {
            it("should call #turnCritterLeft", function () {
              spyOn(critterActuator, 'turnCritterLeft');
              critterUpdater.update();
              expect(critterActuator.turnCritterLeft).toHaveBeenCalledWith(zoe);
            });
          });

          describe("when the getActions is MOVE_FORWARD_AND_EAT_CRITTER", function(){
            it("should call moveForwardAndEatCritter", function(){
              spyOn(critterActuator, 'moveForwardAndEatCritter');
              critterUpdater.update();
              expect(critterActuator.moveForwardAndEatCritter).toHaveBeenCalledWith(ben);
            });
          });

          describe("when the getActions is TURN_RIGHT", function ( ) {
            it("should call #turnCritterRight", function () {
              spyOn(critterActuator, 'turnCritterRight');
              critterUpdater.update();
              expect(critterActuator.turnCritterRight).toHaveBeenCalledWith(joe);
            });
          });

          describe("when the getActions is REPRODUCE", function () {
            it("should call #reproduceCritter", function () {
              kim.vitals.mana = Critter.Actions.REPRODUCE.cost + 1;
              spyOn(critterActuator, 'reproduceCritter');
              critterUpdater.update();
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
              critterUpdater.update();
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
              critterUpdater.update();
              expect(critterActuator.decrementCounterOnCritter).toHaveBeenCalledWith(coleman);
            });
          });

          describe("when the getActions is RESET_COUNTER", function(){
            it("should call resetCounterOnCritter", function(){
              var coleman = new Critter({mind: new CritterMind({action: Critter.Actions.RESET_COUNTER})});
              world.place(coleman, {x:0, y:0});
              spyOn(critterActuator, 'resetCounterOnCritter');
              critterUpdater.update();
              expect(critterActuator.resetCounterOnCritter).toHaveBeenCalledWith(coleman);
            });
          });



          describe("when the critter is dead", function(){
            beforeEach(function () {
              rob.vitals.mana = -10;
            });

            it('decays', function () {
              rob.vitals.decay = 0;
              critterUpdater.update();
              expect(rob.vitals.decay).toEqual(1);
            });

            it("should remove decayed critters", function() {
              rob.vitals.decay = singletonContext.configuration.decompositionTime;
              critterUpdater.update();
              expect(world.things).not.toContain(rob);
              expect(world.things).toContain(zoe);
              expect(world.things).toContain(kim);
            });
          });

          describe("when the critter does not have enough mana to perform the action", function(){
            beforeEach(function () {
              rob.vitals.mana = 1;
            });

            it("should kill the critter", function(){
              critterUpdater.update();
              expect(rob.vitals.decay).toEqual(0);
              expect(rob.isDead()).toBe(true);
            });

            it("does not remove the critter from the world", function () {
              critterUpdater.update();
              expect(world.things).toContain(rob);
            });

            it("should not perform the action", function(){
              spyOn(critterActuator, 'moveCritterForward');
              critterUpdater.update();
              expect(critterActuator.moveCritterForward).not.toHaveBeenCalledWith(rob);
            });
          });


          describe("when the getActions is MOVE_FORWARD", function() {
        it("should call #moveCritterForward", function() {
          spyOn(critterActuator, 'moveCritterForward');
          critterUpdater.update();
          expect(critterActuator.moveCritterForward).toHaveBeenCalledWith(rob);
        });

        describe("when the critter is selected", function(){
          var critterMovedCallback;
          beforeEach(function(){
            critterMovedCallback = jasmine.createSpy();
            rob = new Critter({genes:[['action', 'MOVE_FORWARD']]});
            world.place(rob, {x:1, y:1});
            world.selectedCritter = rob;
            singletonContext.eventBus.bind('selectedCritterMoved', critterMovedCallback);
          });

          it("triggers an event with the critter's new location", function() {
            critterUpdater.update();
            expect(critterMovedCallback).toHaveBeenCalledWith({critter:rob, location:{gridX:1, gridY:0}})
          });
        });

        describe("when the critter is not selected", function(){
          var critterMovedCallback;
          beforeEach(function(){
            critterMovedCallback = jasmine.createSpy();
            rob = new Critter();
            world.place(rob, {x:1, y:1});
            singletonContext.eventBus.bind('selectedCritterMoved', critterMovedCallback);
          });

          it("does not trigger an event", function() {
            critterUpdater.update();
            expect(critterMovedCallback).not.toHaveBeenCalled();
          });
        });
      });

          it("should update the critters' mana", function () {
            critterUpdater.update();
            expect(zoe.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.TURN_LEFT.cost);
            expect(rob.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.MOVE_FORWARD.cost);
            expect(kim.vitals.mana).toEqual(Critter.DEFAULT_STARTING_MANA - Critter.Actions.REPRODUCE.cost);
          });
      });

      describe("when the critter's getAction is MAKE_SOUND", function(){
        it("makes a sound", function(){
          var cher = new Critter({mind: new CritterMind({action: Critter.Actions.MAKE_SOUND })});
          world.place(cher,{x: 2, y:3});
          spyOn(critterActuator, "produceSound");
          world.update();
          expect(critterActuator.produceSound).toHaveBeenCalledWith(cher);
        });
      });

      it("should get the critter's action based on its stimuli", function () {
        var stimulusPackager = jasmine.createSpyObj('packager', ['package']);
        singletonContext.stimulusPackager = stimulusPackager;
        var somethingInteresting = "Some stimulating conversation";
        stimulusPackager.package.and.returnValue(somethingInteresting);

        rob = new Critter();
        world.place(rob, {x:1, y:1});
        spyOn(rob, "getActions").and.callThrough();
        critterUpdater.update();
        expect(stimulusPackager.package).toHaveBeenCalledWith(rob);
        expect(rob.getActions).toHaveBeenCalledWith(somethingInteresting);
      });

      describe("when there are multiple actions", function(){
        var fred, originalMana, world;

        beforeEach(function () {
          fred = new Critter();
          world = singletonContext.world;
          originalMana = Critter.Actions.REPRODUCE.cost + Critter.Actions.MOVE_FORWARD.cost + 1;
          fred.vitals.mana = originalMana;
          spyOn(fred, "getActions").and.returnValue([Critter.Actions.MOVE_FORWARD, Critter.Actions.REPRODUCE]);
          world.place(fred, {x:5, y:5});
        });

        it("applies both actions", function () {
          spyOn(critterActuator, "moveCritterForward");
          spyOn(critterActuator, "reproduceCritter");
          critterUpdater.update();
          expect(critterActuator.moveCritterForward).toHaveBeenCalledWith(fred);
          expect(critterActuator.reproduceCritter).toHaveBeenCalledWith(fred);
        });

        it("applies both costs", function(){
          critterUpdater.update();
          expect(fred.vitals.mana).toEqual(1);
        });
      });

      describe("when the critter was removed during the update of another critter", function(){
        it("does not update the removed critter", function(){
         var fred = new Critter();
          spyOn(fred, "getActions").and.returnValue([Critter.Actions.MOVE_FORWARD]);
          world.place(fred, {x:5, y:5});
          delete fred.location;
          spyOn(critterActuator, "moveCritterForward");

          critterUpdater.update();
   expect(critterActuator.moveCritterForward).not.toHaveBeenCalledWith(fred);
        });
      });

    });
});