$(function(){
  CritterView = Backbone.View.extend({
    render: function(){
      this.$el.html('<div class="critter '+ this.model.direction.toLowerCase() + ' ' + this.model.color +'"></div>');
      return this;
    }
  });
});
