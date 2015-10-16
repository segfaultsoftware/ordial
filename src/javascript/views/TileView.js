$(function(){
  TileView = Backbone.View.extend({
    events: {
      'click .critter': function(){
        window.singletonContext.eventBus.trigger('critterSelectedOnMap', this.model);
      }
    },
    className: 'tile',
    template: function(tileType){
      return JST['src/viewTemplates/tiles/' + tileType +'.template.html'](this.model);
    },

    render: function(){
      var tileType = 'tile';
      if(this.model){
        if(this.model instanceof Critter){
          tileType = 'critter';
        }
        else if (this.model instanceof Resource) {
          tileType = 'resource';
        }
        else if (this.model instanceof Rock) {
          tileType = 'rock';
        }
      }
      this.$el.html(this.template(tileType));
      return this;
    }
  });
});
