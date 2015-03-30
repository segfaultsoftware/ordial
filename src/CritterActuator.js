$(function() {
  CritterActuator = Backbone.Model.extend({
    moveCritterForward: function(critter){
      var world = singletonContext.world;

      var nextLocation = world.getTileInDirection(RelativeDirection.FORWARD, critter);
      var thingAtNextLocation = world.getThingAt(nextLocation);
      if (!thingAtNextLocation || critter.canEat(thingAtNextLocation)) {
        world.place(critter, nextLocation);
        critter.eat(thingAtNextLocation);
      }

      critter.vitals.mana -= Critter.Actions.MOVE_FORWARD.cost;
    },

    turnCritter: function(critter, direction, action) {
      critter.direction = CardinalDirection.getDirectionAfterRotation(
        critter.direction,
        direction
      );

      critter.vitals.mana -= action.cost;
    },

    turnCritterLeft: function(critter){
      return this.turnCritter(critter, RelativeDirection.LEFT, Critter.Actions.TURN_LEFT);
    },

    turnCritterRight: function(critter){
      return this.turnCritter(critter, RelativeDirection.RIGHT, Critter.Actions.TURN_RIGHT);
    },

    reproduceCritter: function(critter){
      var world = singletonContext.world;
      function createOffspringInDirection(relativeDirection){
        var offspringLocation = world.getTileInDirection(relativeDirection, critter);
        var contentsOfTile = world.getThingAt(offspringLocation);
        var offspring = new Critter({mind: critter.mind});
        if ((!contentsOfTile || offspring.canEat(contentsOfTile)) && world.isLocationInsideWorld(offspringLocation)) {
          offspring.direction = CardinalDirection.getDirectionAfterRotation(critter.direction, relativeDirection);
          world.place(offspring, offspringLocation);
          offspring.eat(contentsOfTile);
        }
      }

      if(critter.vitals.mana >= Critter.Actions.REPRODUCE.cost){
        if (Math.floor(Math.random() * 1000) % 2) {
          createOffspringInDirection(RelativeDirection.LEFT);
          createOffspringInDirection(RelativeDirection.RIGHT);
        }
        else {
          createOffspringInDirection(RelativeDirection.RIGHT);
          createOffspringInDirection(RelativeDirection.LEFT);
        }
      }

      critter.vitals.mana -= Critter.Actions.REPRODUCE.cost;
    },

    incrementCounterOnCritter: function(critter) {
      critter.vitals.counter++;
    },

    decrementCounterOnCritter: function(critter) {
      critter.vitals.counter--;
    }
  });
});