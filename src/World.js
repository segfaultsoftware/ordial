$(function() {
  World = Backbone.Model.extend({
    initialize: function() {
      this.width = 50;
      this.height = 20;
      this.tiles = [];
      this.things = [];
    },

    update: function(){
      var world = this;
      var critterActuator = singletonContext.critterActuator;
      var deadThings = [];
      _.each(_.shuffle(this.things), function(thing){
        if (thing.getActions) {
          var stimuli = window.singletonContext.stimulusPackager.package(world, thing);
          var actions = thing.getActions(stimuli);
          actions = _.isArray(actions) ? actions : [actions];

          _.each(actions, function(action) {
            if(thing.vitals.mana >= action.cost){
              switch(action) {
                case Critter.Actions.MOVE_FORWARD:
                  critterActuator.moveCritterForward(thing);
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
              }
            }

            thing.vitals.mana -= action.cost;

            if(thing.vitals.mana <= 0){
              deadThings.push(thing);
            }
          });
        }
      });

      _.each(deadThings, function(thing){ world.remove(thing);});

      window.singletonContext.resourceSpawner.spawn();
    },

    place: function(thing, location){
      var x = location.x;
      var y = location.y;

      if(!this.isLocationInsideWorld(location)) {
        if(!thing.location){
          throw new Error("Placing thing outside the world at " + x + "," + y, thing);
        }
      }
      else {
        var row = this.tiles[x] || [];
        if(row[y]){
          this.remove(row[y]);
        }

        if(thing.location){
          this.tiles[thing.location.x][thing.location.y] = null;
        }

        row[y] = thing;
        this.tiles[x] = row;
        thing.location = {x:x, y:y};
        if (!this.contains(thing)) {
          this.things.push(thing);
        }
      }
    },

    contains: function(thing) {
      return _.contains(this.things, thing);
    },

    remove: function(thing){
      var index = this.things.indexOf(thing);
      if (index >= 0) {
        this.things.splice(index, 1);
      }
      if (thing.location && this.tiles[thing.location.x]) {
        this.tiles[thing.location.x][thing.location.y] = undefined;
      }

      delete thing.location;
    },

    isLocationInsideWorld: function(location){
      return location.x >= 0 && location.x < this.width &&
        location.y >= 0 && location.y < this.height;
    },

    getThingAt: function(location){
      return this.tiles[location.x] ? this.tiles[location.x][location.y] : null;
    },

    getTileInDirection: function(direction, thing){
      function getOffsetInFrontOf(thingDirection){
        var xDelta = 0, yDelta = 0;
        switch (thingDirection){
          case CardinalDirection.WEST:
            xDelta = -1;
            break;
          case CardinalDirection.NORTH:
            yDelta = -1;
            break;
          case CardinalDirection.EAST:
            xDelta = 1;
            break;
          case CardinalDirection.SOUTH:
            yDelta = 1;
            break;
        }
        return {xDelta: xDelta, yDelta: yDelta};
      }

      var offset;
      if (direction == RelativeDirection.FORWARD){
        offset = getOffsetInFrontOf(thing.direction);
      }
      else {
        var cardinalDirectionAfterRotation = CardinalDirection.getDirectionAfterRotation(thing.direction, direction);
        offset = getOffsetInFrontOf(cardinalDirectionAfterRotation);
      }

      return {x: thing.location.x + offset.xDelta, y: thing.location.y + offset.yDelta};
    },

    getFreeTiles: function() {
      var freeTiles = [];
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          if (!this.tiles[x] || !this.tiles[x][y]) {
            freeTiles.push({x: x, y: y});
          }
        }
      }
      return freeTiles;
    }
  });
});
