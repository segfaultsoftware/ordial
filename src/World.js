$(function() {
  World = Backbone.Model.extend({
    initialize: function() {
      this.tiles = [];
      this.thingStates = [];
    },

    update: function(){
      _.each(this.tiles, function(tilesOnRow){
        _.each(tilesOnRow, function(tileContent) {
          tileContent.getAction();
        });
      });
    },

    place: function(thing, x, y){
      var row = this.tiles[x] || [];
      row[y] = thing;
      this.tiles[x] = row;
    },

    getThingAt: function(x, y){
      return this.tiles[x] ? this.tiles[x][y] : null;
    },

    getTileInDirection: function(direction, thing){
      var thingState = this.findThingState(thing);
      var location = thingState.location;
      var critterDirection = thingState.direction;
      var xDelta = 0, yDelta = 0;

      if (direction == RelativeDirection.FORWARD){
        switch (critterDirection ){
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

      return {x: location.x + xDelta, y: location.y + yDelta};
    },
    
    findThingState: function(thing) {
      var entry = _.find(this.thingStates, function(entry){
        return entry.thing == thing;
      });

      return entry.state;
    }
  });
});