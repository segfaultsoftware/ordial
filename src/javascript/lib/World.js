World = Backbone.Model.extend({
  initialize: function() {
    this.width = 40;
    this.height = 25;
    this.tiles = [];
    this.things = [];
  },

  update: function(){
    var world = this;

    singletonContext.critterUpdater.update();
    singletonContext.soundSilencer.silenceWorld();
    singletonContext.resourceSpawner.spawn();
  },

  place: function(thing, location){
    var x = location.x;
    var y = location.y;
    var navigator = singletonContext.worldNavigator;

    if(!navigator.isLocationInsideWorld(location)) {
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

  getThingAt: function(location){
    return singletonContext.worldNavigator.getThingAt(location);
  },
});