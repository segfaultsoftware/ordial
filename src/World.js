$(function() {
  World = Backbone.Model.extend({
    initialize: function() {
      this.width = 10;
      this.height = 10;
      this.tiles = [];
      this.things = [];
    },

    update: function(){
      var world = this;
      _.each(this.things, function(thing){
        switch(thing.getAction()) {
          case Critter.Actions.MOVE_FORWARD:
            world.moveCritterForward(thing);
            break;

          case Critter.Actions.TURN_LEFT:
            world.turnCritterLeft(thing);
            break;
        }

      });
    },

    place: function(thing, x, y){
      if(!this.isLocationInsideWorld(x,y)){
        console.error("You can't place that thing:", thing, " at x:" + x + " y:" + y );
      }
      else {
        if(thing.location){
          this.tiles[thing.location.x][thing.location.y] = null;
        }
        var row = this.tiles[x] || [];
        row[y] = thing;
        this.tiles[x] = row;
        thing.location = {x:x, y:y};
        if (!_.contains(this.things, thing)) {
          this.things.push(thing);
        }
      }
    },

    remove: function(thing){
      var index = this.things.indexOf(thing);
      if (index >= 0) {
        this.things.splice(index, 1);
      }
    },

    isLocationInsideWorld: function(x, y){
      return x >= 0 && x < this.width &&
             y >= 0 && y < this.height;
    },

    getThingAt: function(x, y){
      return this.tiles[x] ? this.tiles[x][y] : null;
    },

    getTileInDirection: function(direction, thing){
      var xDelta = 0, yDelta = 0;

      if (direction == RelativeDirection.FORWARD){
        switch (thing.direction){
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
      }

      return {x: thing.location.x + xDelta, y: thing.location.y + yDelta};
    },

    moveCritterForward: function(critter){
      var nextLocation = this.getTileInDirection(RelativeDirection.FORWARD, critter);
      var thingAtNextLocation = this.getThingAt(nextLocation.x, nextLocation.y);
      if (!thingAtNextLocation) {
        this.place(critter, nextLocation.x, nextLocation.y);
      }
    },

    turnCritterLeft: function(critter){
      critter.direction = CardinalDirection.getDirectionAfterRotation(
        critter.direction,
        RelativeDirection.LEFT
      );
    }
});
});
