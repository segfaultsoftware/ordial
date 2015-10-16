$(function() {
  WorldView = Backbone.View.extend({
    initialize: function(){
      this.subviews = [];
    },

    template: function () {
      return JST['src/viewTemplates/world.template.html'](this.model);
    },

    render: function() {
      // render the grid
      // render the world inhabitants
      this.$el.html(this.template(this.model));

      for(var row = 0; row < this.model.height; row++) {
        for(var col = 0; col < this.model.width; col++){
          var thing = this.model.getThingAt({x: col, y: row});
          this.replaceSubView({col:col,row:row}, thing);
        }
      }

      return this;
    },

    replaceSubView:function(coordinates, thing){
      var row = coordinates.row;
      var col = coordinates.col;

      if(!this.subviews[row]) {
        this.subviews[row] = [];
      }

      if(!this.subviews[row][col]){
        this.subviews[row][col] = new TileView({model:thing});
      }

      var subview = this.subviews[row][col];
      subview.model = thing;
      subview.setElement(this.$('#thing-'+row+'-' + col)).render();
    }
  });
});
