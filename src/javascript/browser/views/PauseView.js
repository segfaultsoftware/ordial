var Backbone = require("backbone");

PauseView = Backbone.View.extend({
  events: {
    'click #pause-button': 'pause'
  },
  pause: function () {
    this.trigger("pauseButtonClicked");
    if(this.model.paused){
      this.model.paused = false;
      this.model.schedule();
    } else {
      this.model.pause();
    }
    this.render();
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