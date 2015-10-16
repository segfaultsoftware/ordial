$(function() {
  WorldView = Backbone.View.extend({
    initialize: function() {
      this.cellSize = 20;
      this.paper = Raphael(this.$el[0], this.model.width * this.cellSize, this.model.height * this.cellSize);
      this.paper.rect(0, 0, this.model.width * this.cellSize, this.model.height * this.cellSize);
      this.paper.circle(10, 10, 10);

      this.subviews = [];

      for(var row = 0; row < this.model.height; row++) {
        this.subviews[row] = [];
        for(var col = 0; col < this.model.width; col++) {
          var thing = this.model.getThingAt({x: col, y: row});
          var viewRect = this.drawTileRect({x: col, y: row});
          var viewSet = this.paper.set();
          var view = new TileView({model: thing, viewSet: viewSet, viewRect: viewRect, paper: this.paper});
          this.subviews[row][col] = {
            viewRect: viewRect,
            viewSet: viewSet,
            view: view
          }
        }
      }
    },
    render: function() {
      this.debouncedRender();
      return this;
    },
    debouncedRender: _.debounce(function(){
      for(var row = 0; row < this.model.height; row++) {
        for(var col = 0; col < this.model.width; col++) {
          var thing = this.model.getThingAt({x: col, y: row});
          var subview = this.subviews[row][col].view;
          subview.model = thing;
          subview.render();
        }
      }

    }),

    drawTileRect: function(arrayCoords) {
      return this.paper.rect(arrayCoords.x*this.cellSize, arrayCoords.y*this.cellSize, this.cellSize, this.cellSize)
        .attr({stroke:'none'});
    },

    renderThingAt: function(thing) {
      var view;

      if(thing) {
        if(thing instanceof Critter) {
          view = new CritterView({model: thing});
        }
        else if(thing instanceof Resource) {
          view = new ResourceView();
        }
        else if(thing instanceof Rock) {
          view = new RockView();
        }
      }
      return view ? view.render().el : null;
    }
  });
});
