var Backbone = require("backbone");

SaveControlsView = Backbone.View.extend({
  events: {
    'click .save-button': 'saveWorld',
    'click .load-button': 'loadWorld'
  },
  template: function () {
    return JST['src/viewTemplates/saveControls.template.html'](this.model);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  saveWorld: function () {
    var serializedWorld = singletonContext.worldSerializer.serialize(singletonContext.world);
    this.$el.find('.load-text').val(serializedWorld);
  },

  loadWorld: function () {
    singletonContext.worldSerializer
      .deserialize(this.$el.find('.load-text').val(), singletonContext.world);
  }
});

module.exports = SaveControlsView;