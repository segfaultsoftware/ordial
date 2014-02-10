$(function() {
  World = Backbone.Model.extend({
    initialize: function() {
      this.tiles = [];
    },
    update: function(){

    },

    place: function(thing, x, y){
      var row = this.tiles[x] || [];
      row[y] = thing;
      this.tiles[x] = row;
    },

    getThingAt: function(x, y){
      return this.tiles[x] ? this.tiles[x][y] : null;
    }
  });
});