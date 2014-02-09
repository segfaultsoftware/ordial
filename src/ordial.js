$(function() {
  Ordial = Backbone.View.extend({
    el: $('#ordial'),

    initialize: function(){
      this.world = new World();
      this.paused = true;

    },

    togglePause: function() {
      console.log("togglePause from " + this.paused);
      this.paused = !this.paused;
      if(!this.paused){
        this.updateWorld();
      }
    },

    updateWorld: function() {
      console.log("Updating the world");
      this.worldView = new WorldView({model: this.world});
      this.render();

      if(!this.paused){
        this.world.update();
        _.delay(_.bind(this.updateWorld, this), 1000);
      }
    },

    render: function(){
      var ordial = this;
      this.pauseView = new PauseView();
      // (possibly?) leaks when pauseView should be garbage collected
      this.listenTo(this.pauseView, 'pauseButtonClicked', function() {
        ordial.togglePause();
      });
      this.$el.html(this.pauseView.render().el);
      if(this.worldView){
        this.$el.append(this.worldView.render().el);
      }
    }

  });
});