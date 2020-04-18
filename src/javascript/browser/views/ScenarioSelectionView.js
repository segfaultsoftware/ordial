var Backbone = require("backbone");
var _ = require('underscore');

ScenarioSelectionView = Backbone.View.extend({
  events: {
    'click input[type=radio]': 'onSelect'
  },

  onSelect: function (event) {
    var id = event.currentTarget.getAttribute('id')
    this.$el.hide();
    let scenario = _.findWhere(this.model.scenarios, { id });
    if (scenario.serializedWorld) {
      singletonContext.worldSerializer.deserialize(scenario.serializedWorld, singletonContext.world)
    }
    if (scenario.code) {
      // world needs to be in scope for the code's sake.
      var world = singletonContext.world;
      world.initialize();
      eval(scenario.code);
    }
    singletonContext.scheduler.paused = false;
    singletonContext.scheduler.schedule()
  },

  template: function () {
    return JST['src/viewTemplates/scenarioSelection.template.html'](this.model);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = ScenarioSelectionView;