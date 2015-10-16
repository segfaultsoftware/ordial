$(function() {
  WorldView = Backbone.View.extend({
    render: function() {
      // render the grid
      // render the world inhabitants
      var tableEl = document.createElement('table');
      this.$el.html('');
      for(var row = 0; row < this.model.height; row++) {
        var rowEl = document.createElement('tr');
        for(var col = 0; col < this.model.width; col++){
          var thing = this.model.getThingAt({x: col, y: row});
          var thingView = this.renderThingAt(thing);
          var tdEl = document.createElement('td');
          if(thingView){
            tdEl.appendChild(thingView);
          }
          rowEl.appendChild(tdEl);
        }
        tableEl.appendChild(rowEl);
      }
      this.el.appendChild(tableEl);
      return this;
    },

    renderThingAt: function(thing){
      var view;

      if(thing){
        if(thing instanceof Critter){
          view = new CritterView({model: thing});
        }
        else if (thing instanceof Resource) {
          view = new ResourceView();
        }
        else if (thing instanceof Rock) {
          view = new RockView();
        }
      }
      return view ? view.render().el: null;
    }
  });
});
