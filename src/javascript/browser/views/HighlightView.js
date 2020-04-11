var Backbone = require("backbone");

HighlightView = Backbone.View.extend({
  initialize: function (options) {
    this.graphics = options.graphics;
    this.cellSize = options.cellSize;
    singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setLocation, this));
    singletonContext.eventBus.bind('selectedCritterMoved', _.bind(this.setLocation, this));
  },

  setLocation: function (options) {
    this.location = options.location;
  },

  render: function () {
    if (this.location) {
      this.graphics.drawRect(
        this.location.gridX * this.cellSize,
        this.location.gridY * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    }
    return this;
  }
});

module.exports = HighlightView;