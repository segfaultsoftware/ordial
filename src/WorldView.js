$(function() {
  WorldView = Backbone.View.extend({
    id: 'world',

    render: function() {
      // render the grid
      // render the world inhabitants


      this.$el.html("<table border='1'>");
      for(var row = 0; row < 10; row++) {
        var rowHtml = "<tr>";
        for(var col = 0; col < 10; col++){
          var thing = this.model.getThingAt(col, row);
          var thingView = this.renderThingAt(thing);
          rowHtml += "<td>" + thingView + "</td>";
        }
        rowHtml += "</tr>";
        this.$("table").append(rowHtml);//"<tr><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td><td class='tile'></td>");
      }
      return this;
    },

    renderThingAt: function(thing){
      if(thing != undefined && thing != null){
        return '<div class="critter"></div>';
      }
      return "";
    }
  });
});
