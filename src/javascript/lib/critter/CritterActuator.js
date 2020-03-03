var Critter = require("./Critter");
var Sound = require("../models/Sound");
var CardinalDirection = require("../models/CardinalDirection");
var RelativeDirection = require("../models/RelativeDirection");

function CritterActuator() {
  this.moveCritterForward = function(critter) {
    var world = singletonContext.world;
    var worldNavigator = singletonContext.worldNavigator;

    var nextLocation = worldNavigator.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = worldNavigator.getThingAt(nextLocation);
    if (!thingAtNextLocation || critter.canTrample(thingAtNextLocation)) {
      world.place(critter, nextLocation);
      critter.eat(thingAtNextLocation);
    }
  }

  this.eatThingInFront = function (critter) {
    var worldNavigator = singletonContext.worldNavigator;
    var world = singletonContext.world;

    var locationInFront = worldNavigator.getTileInDirection(RelativeDirection.FORWARD, critter);
    var thingAtNextLocation = worldNavigator.getThingAt(locationInFront);
    if (thingAtNextLocation && critter.canTrample(thingAtNextLocation)) {
      critter.eat(thingAtNextLocation);
      world.remove(thingAtNextLocation);
    } else if(thingAtNextLocation instanceof Critter){
      var manaToEat = Math.round(thingAtNextLocation.vitals.mana * Critter.Actions.EAT_THING_IN_FRONT.critterConsumptionPercent / 100);
      thingAtNextLocation.vitals.mana -= manaToEat;
      critter.vitals.mana += manaToEat;
    }
  };

  this.turnCritter = function(critter, direction, action) {
    critter.direction = CardinalDirection.getDirectionAfterRotation(
      critter.direction,
      direction
    );
  }

  this.turnCritterLeft = function(critter) {
    return this.turnCritter(critter, RelativeDirection.LEFT, Critter.Actions.TURN_LEFT);
  }

  this.turnCritterRight = function(critter) {
    return this.turnCritter(critter, RelativeDirection.RIGHT, Critter.Actions.TURN_RIGHT);
  }

  this.reproduceCritter = function(critter) {
    var world = singletonContext.world;
    var worldNavigator = singletonContext.worldNavigator;

    function createOffspringInDirection(relativeDirection, critterPlans) {
      var offspringLocation = worldNavigator.getTileInDirection(relativeDirection, critter);
      var contentsOfTile = worldNavigator.getThingAt(offspringLocation);
      var offspring = new Critter(critterPlans);
      if ((!contentsOfTile || offspring.canTrample(contentsOfTile)) && worldNavigator.isLocationInsideWorld(offspringLocation)) {
        offspring.direction = CardinalDirection.getDirectionAfterRotation(critter.direction, relativeDirection);
        world.place(offspring, offspringLocation);
        offspring.eat(contentsOfTile);
      }
    }

    var cloneGenes = critter.replicateGenes();
    var mutantGenes = singletonContext.geneMutator.mutate(critter.replicateGenes());

    if (singletonContext.randomNumberGenerator.random(1)) {
      createOffspringInDirection(RelativeDirection.LEFT, { genes: cloneGenes, color: critter.color });
      createOffspringInDirection(RelativeDirection.RIGHT, { genes: mutantGenes });
    } else {
      createOffspringInDirection(RelativeDirection.LEFT, { genes: mutantGenes });
      createOffspringInDirection(RelativeDirection.RIGHT, { genes: cloneGenes, color: critter.color });
    }
  }

  this.incrementCounterOnCritter = function(critter) {
    critter.vitals.counter++;
  }

  this.decrementCounterOnCritter = function(critter) {
    critter.vitals.counter--;
  }

  this.resetCounterOnCritter = function(critter) {
    critter.vitals.counter = Critter.DEFAULT_STARTING_COUNTER;
  }

  this.produceSound = function(critter) {
    var soundBox = singletonContext.soundBox;
    var worldNavigator = singletonContext.worldNavigator;


    function createSoundInDirection(relativeDirection) {
      var location = worldNavigator.getTileInDirection(relativeDirection, critter);
      if (worldNavigator.isLocationInsideWorld(location)) {
        soundBox.makeFutureSound(new Sound(), location);
      }
    }

    createSoundInDirection(RelativeDirection.FORWARD);
    createSoundInDirection(RelativeDirection.LEFT);
    createSoundInDirection(RelativeDirection.RIGHT);
    createSoundInDirection(RelativeDirection.BEHIND);
  }
}

module.exports = CritterActuator;