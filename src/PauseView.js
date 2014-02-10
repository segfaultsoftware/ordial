$(function() {
  PauseView = Backbone.View.extend({
    initialize: function(options){
      this.paused = options.paused;
    },
    events: {
      'click #pause-button': 'pause'
    },
    pause: function(){
      this.trigger("pauseButtonClicked");
    },
    render: function(){
      this.$el.html('<button id="pause-button">'+this.buttonText()+'</button>');
      return this;
    },
    buttonText: function(){
      return this.paused ? "resume" : "pause";
    }
  });
});