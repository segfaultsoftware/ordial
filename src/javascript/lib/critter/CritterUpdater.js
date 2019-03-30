var Critter = require("./Critter");

var CritterUpdater = function(){
  this.update = function(){
      var world = singletonContext.world;
      var stimulusPackager = singletonContext.stimulusPackager;
      var critterActuator = singletonContext.critterActuator;
      var deadThings = [];
      _.each(_.shuffle(world.things), function(thing){
        if (thing.getActions && thing.location) {
          var stimuli = stimulusPackager.package(thing);
          var actions = thing.getActions(stimuli);
          actions = _.isArray(actions) ? actions : [actions];

          _.each(actions, function(action) {
            if(thing.vitals.mana >= action.cost){
              switch(action) {
                case Critter.Actions.MOVE_FORWARD:
                  critterActuator.moveCritterForward(thing);
                  if(world.selectedCritter === thing){
                    singletonContext.eventBus.trigger('selectedCritterMoved',
                      {critter:thing, location:{gridX:thing.location.x, gridY:thing.location.y}});
                  }
                  break;

                case Critter.Actions.TURN_LEFT:
                  critterActuator.turnCritterLeft(thing);
                  break;

                case Critter.Actions.TURN_RIGHT:
                  critterActuator.turnCritterRight(thing);
                  break;

                case Critter.Actions.REPRODUCE:
                  critterActuator.reproduceCritter(thing);
                  break;

                case Critter.Actions.INCREMENT_COUNTER:
                  critterActuator.incrementCounterOnCritter(thing);
                  break;

                case Critter.Actions.DECREMENT_COUNTER:
                  critterActuator.decrementCounterOnCritter(thing);
                  break;

                case Critter.Actions.MOVE_FORWARD_AND_EAT_CRITTER:
                  critterActuator.moveForwardAndEatCritter(thing);
                  break;

                case Critter.Actions.RESET_COUNTER:
                  critterActuator.resetCounterOnCritter(thing);
                  break;
                case Critter.Actions.MAKE_SOUND:
                  critterActuator.produceSound(thing);
                  break;
              }
            }

            thing.vitals.mana -= action.cost;

            if(thing.vitals.mana <= 0){
              deadThings.push(thing);
            }
          });
        }
      });

      _.each(deadThings, function(thing){
        thing.decay();
        if(thing.vitals.decay >= singletonContext.configuration.decompositionTime) {
          world.remove(thing);
        }
      });
  }
}

module.exports = CritterUpdater;