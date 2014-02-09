$(function() {
  Ordial = Backbone.Model.extend({
    initialize: function(){
      this.world = new World();
    }

  });
});