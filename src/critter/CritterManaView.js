$(function() {
  CritterManaView = Backbone.View.extend({
    initialize: function(){
     this.model = {mana:'(no critter selected)'}; window.singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
    },
    setCritter: function(critter){
      this.model = critter.vitals;
      this.render();
    },

    template: function() {
      return _.template(
        '<label>Mana</label><span class="critter-mana">' +
        '<%= mana %>' +
        '</span>',
        this.model);
    },

    render: function(){
      this.$el.html(this.template());
      return this;
    }
  });
});
