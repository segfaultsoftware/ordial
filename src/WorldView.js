$(function() {
  WorldView = Backbone.View.extend({
    render: function() {
      // render the grid
      // render the world inhabitants


      this.$el.html("<table border='1'>");
      for(var row = 0; row < this.model.height; row++) {
        var rowHtml = "<tr>";
        for(var col = 0; col < this.model.width; col++){
          var thing = this.model.getThingAt({x: col, y: row});
          var thingView = this.renderThingAt(thing);
          rowHtml += "<td>" + thingView + "</td>";
        }
        rowHtml += "</tr>";
        this.$("table").append(rowHtml);
      }
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
