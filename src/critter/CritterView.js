$(function(){
  CritterView = Backbone.View.extend({
    events: {
      'click .critter': function(){
 window.singletonContext.eventBus.trigger('critterSelectedOnMap', this.model);
      }
    },
    className: 'tile',
    render: function(){
      this.$el.html('<div class="critter '+ this.model.direction.toLowerCase() + ' ' + this.model.color +'"></div>');
      return this;
    }
  });
});
