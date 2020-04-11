var Backbone = require("backbone");

TimeoutControlsView = Backbone.View.extend({
  events: {
    'change .slider': 'onSliderChanged'
  },

  onSliderChanged: function () {
    var sliderVal = this.$el.find('.slider').val();
    var timeout = (100 - sliderVal) / 100 * OrdialScheduler.DEFAULT_TIMEOUT * 2;
    this.trigger('timeout:changed', { timeout: timeout });
  },

  render: function () {
    this.$el.html('' +
      '<div>' +
      ' <span>Speed</span>' +
      ' <input class="slider" type="range" />' +
      '</div>'
    );
    return this;
  }
});

module.exports = TimeoutControlsView;