CritterActuator = Backbone.Model.extend({
  moveCritterForward: function(critter){
    var world = singletonContext.world;
    var worldNavigator = singletonContext.worldNavigator;

    var nextLocation = worldNavigator.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = worldNavigator.getThingAt(nextLocation);
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
    var worldNavigator = singletonContext.worldNavigator;

    function createOffspringInDirection(relativeDirection, critterPlans){
      var offspringLocation = worldNavigator.getTileInDirection(relativeDirection, critter);
      var contentsOfTile = worldNavigator.getThingAt(offspringLocation);
      var offspring = new Critter(critterPlans);
      if ((!contentsOfTile || offspring.canEat(contentsOfTile)) && worldNavigator.isLocationInsideWorld(offspringLocation)) {
        offspring.direction = CardinalDirection.getDirectionAfterRotation(critter.direction, relativeDirection);
        world.place(offspring, offspringLocation);
        offspring.eat(contentsOfTile);
      }
    }

    var cloneGenes = critter.replicateGenes();
    var mutantGenes = singletonContext.geneMutator.mutate(critter.replicateGenes());

    if (singletonContext.randomNumberGenerator.random(1)) {
      createOffspringInDirection(RelativeDirection.LEFT, {genes: cloneGenes, color: critter.color});
      createOffspringInDirection(RelativeDirection.RIGHT, {genes: mutantGenes});
    }
    else {
      createOffspringInDirection(RelativeDirection.LEFT, {genes: mutantGenes});
      createOffspringInDirection(RelativeDirection.RIGHT, {genes: cloneGenes, color: critter.color});
    }
  },

  incrementCounterOnCritter: function(critter) {
    critter.vitals.counter++;
  },

  decrementCounterOnCritter: function(critter) {
    critter.vitals.counter--;
  },
  
  resetCounterOnCritter: function(critter) {
    critter.vitals.counter = Critter.DEFAULT_STARTING_COUNTER;
  },

  produceSound: function(critter) {
    var world = singletonContext.world;
    var worldNavigator = singletonContext.worldNavigator;


    function createSoundInDirection(relativeDirection){
      var location = worldNavigator.getTileInDirection(relativeDirection, critter);
      var contentsOfTile = worldNavigator.getThingAt(location);
      if (!contentsOfTile && worldNavigator.isLocationInsideWorld(location)) {
        world.place(new Sound(), location);
      }
    }

    createSoundInDirection(RelativeDirection.FORWARD);
    createSoundInDirection(RelativeDirection.LEFT);
    createSoundInDirection(RelativeDirection.RIGHT);
    createSoundInDirection(RelativeDirection.BEHIND);
  },

  moveForwardAndEatCritter: function(critter) {
    var worldNavigator = singletonContext.worldNavigator;

    var isDeadCritter = function(thing){
      return thing instanceof Critter &&
      thing.isDead();
    };

    var world = singletonContext.world;

    var nextLocation = worldNavigator.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = worldNavigator.getThingAt(nextLocation);
    if (!thingAtNextLocation || critter.canEat(thingAtNextLocation)
       || isDeadCritter(thingAtNextLocation)) {
      world.place(critter, nextLocation);
      critter.eat(thingAtNextLocation);
    }
  }
});
