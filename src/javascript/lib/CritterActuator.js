CritterActuator = Backbone.Model.extend({
  moveCritterForward: function(critter){
    var world = singletonContext.world;

    var nextLocation = world.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = world.getThingAt(nextLocation);
    if (!thingAtNextLocation || critter.canEat(thingAtNextLocation)) {
      world.place(critter, nextLocation);
      critter.eat(thingAtNextLocation);
    }
  },

  turnCritter: function(critter, direction, action) {
    critter.direction = CardinalDirection.getDirectionAfterRotation(
      critter.direction,
      direction
    );
  },

  turnCritterLeft: function(critter){
    return this.turnCritter(critter, RelativeDirection.LEFT, Critter.Actions.TURN_LEFT);
  },

  turnCritterRight: function(critter){
    return this.turnCritter(critter, RelativeDirection.RIGHT, Critter.Actions.TURN_RIGHT);
  },

  reproduceCritter: function(critter){
    var world = singletonContext.world;
    function createOffspringInDirection(relativeDirection, genes){
      var offspringLocation = world.getTileInDirection(relativeDirection, critter);
      var contentsOfTile = world.getThingAt(offspringLocation);
      var offspring = new Critter({genes: genes});
      if ((!contentsOfTile || offspring.canEat(contentsOfTile)) && world.isLocationInsideWorld(offspringLocation)) {
        offspring.direction = CardinalDirection.getDirectionAfterRotation(critter.direction, relativeDirection);
        world.place(offspring, offspringLocation);
        offspring.eat(contentsOfTile);
      }
    }

    var cloneGenes = critter.replicateGenes();
    var mutantGenes = singletonContext.geneMutator.mutate(critter.replicateGenes());

    if (singletonContext.randomNumberGenerator.random(1)) {
      createOffspringInDirection(RelativeDirection.LEFT, cloneGenes);
      createOffspringInDirection(RelativeDirection.RIGHT, mutantGenes);
    }
    else {
      createOffspringInDirection(RelativeDirection.LEFT, mutantGenes);
      createOffspringInDirection(RelativeDirection.RIGHT, cloneGenes);
    }
  },

  incrementCounterOnCritter: function(critter) {
    critter.vitals.counter++;
  },

  decrementCounterOnCritter: function(critter) {
    critter.vitals.counter--;
  },

  moveForwardAndEatCritter: function(critter) {
   var isDeadCritter = function(thing){
     return thing instanceof Critter &&
       thing.isDead();
   };
    var world = singletonContext.world;

    var nextLocation = world.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = world.getThingAt(nextLocation);
    if (!thingAtNextLocation || critter.canEat(thingAtNextLocation)
       || isDeadCritter(thingAtNextLocation)) {
      world.place(critter, nextLocation);
      critter.eat(thingAtNextLocation);
    }
  }
});
