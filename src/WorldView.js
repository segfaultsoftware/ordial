$(function() {
  WorldView = Backbone.View.extend({
    render: function() {
      // render the grid
      // render the world inhabitants


//      this.$el.html("<table border='1'>");
//      for(var row = 0; row < this.model.height; row++) {
//        var rowHtml = "<tr>";
//        for(var col = 0; col < this.model.width; col++){
//          var thing = this.model.getThingAt({x: col, y: row});
//          var thingView = this.renderThingAt(thing);
//          rowHtml += "<td>" + thingView + "</td>";
//        }
//        rowHtml += "</tr>";
//        this.$("table").append(rowHtml);
//      }
//      this.$el.html("<div class='isometric-grid' border='1'></div>");

      var tile = {width: 64, height:32};
      var gridHtml = "<div class='something'>";
      for(var row = 0; row < this.model.height; row++) {

        for(var col = 0; col < this.model.width; col++){
          var thing = this.model.getThingAt({x: col, y: this.model.height - 1 - row});
          var thingView = this.renderThingAt(thing);
          var isometricTop = (row + col) * (tile.height / 2);
          var isometricLeft =500 + (this.model.height + row - col)* tile.width /2;

          gridHtml += "<div class='tile' style='" +
            "top:"+isometricTop +"px; " +
            "left:"+ isometricLeft + "px;" +
            "width:"+tile.width + "px;" +
            "height:"+tile.height+"px;'>" + thingView + "</div>";
        }
//        this.$("table").append(rowHtml);
      }
      gridHtml += "</div>";
//      this.$(".isometric-grid").append(gridHtml);
      this.$el.html(gridHtml);
      return this;
    },

    renderThingAt: function(thing){
      var view = undefined;

      if(thing != undefined && thing != null){
        if(thing instanceof Critter){
          view = new CritterView({model: thing}).render();
        }
        else if (thing instanceof Resource) {
          view = new ResourceView().render();
        }
        else if (thing instanceof Rock) {
          view = new RockView().render();
        }
      }
      return view ? view.render().el.innerHTML : "";
    }
  });
});
