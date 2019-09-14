function World() {
  this.initialize = function () {
    this.width = 40;
    this.height = 25;
    this.tiles = [];
    this.things = [];
  };

  this.initialize();

  this.update = function () {
    singletonContext.critterUpdater.update();
    singletonContext.soundBox.silenceWorld();
    singletonContext.soundBox.applySoundsToWorld();
    singletonContext.resourceSpawner.spawn();
  }

  this.placeIfEmpty = (thing, location) => {
    var navigator = singletonContext.worldNavigator;

    if (!navigator.getThingAt(location)) {
      this.place(thing, location);
    }
  };

  this.place = function (thing, location) {
    var x = location.x;
    var y = location.y;
    var navigator = singletonContext.worldNavigator;

    if (navigator.isLocationInsideWorld(location)) {
      var row = this.tiles[x] || [];
      if (row[y]) {
        this.remove(row[y]);
      }

      if (thing.location) {
        this.tiles[thing.location.x][thing.location.y] = null;
      }

      row[y] = thing;
      this.tiles[x] = row;
      thing.location = { x: x, y: y };
      if (!this.contains(thing)) {
        this.things.push(thing);
      }
    } else if (!thing.location) {
      throw new Error("Placing thing outside the world at " + x + "," + y, thing);
    }
  };

  this.contains = function (thing) {
    return _.contains(this.things, thing);
  }

  this.remove = function (thing) {
    var index = this.things.indexOf(thing);
    if (index >= 0) {
      this.things.splice(index, 1);
    }
    if (thing.location && this.tiles[thing.location.x]) {
      this.tiles[thing.location.x][thing.location.y] = undefined;
    }

    delete thing.location;
  }

  this.getThingAt = function (location) {
    return singletonContext.worldNavigator.getThingAt(location);
  }
};

module.exports = World;