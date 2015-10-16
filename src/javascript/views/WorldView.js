$(function() {
  WorldView = Backbone.View.extend({
    initialize: function(){
      this.subviews = [];

      for(var row = 0; row < this.model.height; row++) {
        this.subviews[row] = [];
        for (var col = 0; col < this.model.width; col++) {
          var thing = this.model.getThingAt({x: col, y: row});
          this.subviews[row][col] = new TileView({model:thing});
        }
      }
    },

    template: function () {
      return JST['src/viewTemplates/world.template.html'](this.model);
    },

    render: function() {
      // render the grid
      // render the world inhabitants

      if(!this.alreadyRendered){
        this.$el.html(this.template(this.model));
      }
      console.log('worlde resue', this.alreadyRendered)
      this.alreadyRendered = true;

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
      var subview = this.subviews[row][col];
      subview.model = thing;
      subview.setElement(this.$('#thing-'+row+'-' + col)).render();
    }
  });
});
