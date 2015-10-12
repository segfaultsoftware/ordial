$(function () {
  CritterGutsView = Backbone.View.extend({
    initialize: function () {
      this.model = {};
      window.singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
    },
    setCritter: function (critter) {
      this.model = critter;
      this.render();
    },

    template: function () {
      return JST['src/templates/critterGuts.template.html'](this.model);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });
});
