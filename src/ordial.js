$(function() {
  Ordial = Backbone.View.extend({
    el: $('#ordial'),

    initialize: function(options) {
      this.scheduler = options && options.scheduler ? options.scheduler : new OrdialScheduler();

      this.world = new World();
      this.paused = true;

      this.seedView = new SeedView({model: new Seed(), el:'#seedContainer'});
      this.seedView.render();

      this.pauseView = new PauseView({paused: this.paused, el:'#pauseContainer'});
      this.pauseView.render();

      var ordial = this;
      this.listenTo(this.pauseView, 'pauseButtonClicked', function() {
        ordial.togglePause();
      });
    },

    togglePause: function() {
      console.log("togglePause from " + this.paused);
      this.paused = !this.paused;

      this.updateWorld();
      this.updatePauseButton();
      this.updateSeedView();
    },

    updateWorld: function() {
      console.log("Updating the world");
      this.worldView = new WorldView({model: this.world, el: '#world'});
      this.worldView.render();

      if(!this.paused){
        this.world.update();
        this.scheduler.schedule(this);
      }
    },

    updatePauseButton: function() {
      this.pauseView.paused = this.paused;
      this.pauseView.render();
    },

    updateSeedView: function() {
      this.seedView.disableInput();
      this.seedView.render();
    }

  });
});
