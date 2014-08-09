$(function() {
  Resource = Backbone.Model.extend({
    initialize: function(){
      this.mana = Resource.DEFAULT_MANA_VALUE;
    }
  });

  Resource.DEFAULT_MANA_VALUE = 10;
});
