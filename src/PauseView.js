$(function() {
  PauseView = Backbone.View.extend({
    events: {
      'click #pause-button': 'pause'
    },
    pause: function(){
     this.trigger("pauseButtonClicked");
    },
    render: function(){
      this.$el.html('<button id="pause-button">pause</button>');
      return this;
    }
  });
});