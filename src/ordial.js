$(function() {
  Ordial = Backbone.View.extend({
    el: $('#ordial'),

    initialize: function(){
      this.world = new World();
      this.paused = false;
    },

    togglePause: function() {
      this.paused = !this.paused;
      if(!this.paused){
        this.updateWorld();
      }
    },

    updateWorld: function() {
      this.worldView = new WorldView({model: this.world});
      this.render();

      if(!this.paused){
        this.world.update();
        _.delay(this.updateWorld, 1000);
      }
    },

    render: function(){
      var ordial = this;
      this.pauseView = this.pauseView || new PauseView();
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