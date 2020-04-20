var Backbone = require("backbone");

PauseView = Backbone.View.extend({
  events: {
    'click #pause-button': 'buttonClicked'
  },

  initialize: function () {
    this.listenTo(singletonContext.eventBus, "schedulerPaused", this.render.bind(this));
    this.listenTo(singletonContext.eventBus, "schedulerResumed", this.render.bind(this));
  },

  buttonClicked: function () {
    this.trigger("pauseButtonClicked");
    if (this.model.paused) {
      this.model.resume();
    } else {
      this.model.pause();
    }
  },

  render: function () {
    this.$el.html('<div class="button" id="pause-button">' + this.buttonText() + '</div>');
    return this;
  },

  buttonText: function () {
    return this.model.paused ? "resume" : "pause";
  }
});

module.exports = PauseView;