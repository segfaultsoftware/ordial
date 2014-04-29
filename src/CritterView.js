$(function(){
  CritterView = Backbone.View.extend({
    render: function(){
      this.$el.html('<div class="critter '+ this.model.direction.toLowerCase() + '"></div>');
      return this;
    }
  });
});
