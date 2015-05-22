$(function() {
  Ordial = Backbone.View.extend({
    el: $('#ordial'),

    initialize: function() {
      this.paused = true;

      this.seedView = new SeedView({model: new Seed(), el:'#seedContainer'});
      this.seedView.render();

      this.pauseView = new PauseView({paused: this.paused, el:'#pauseContainer'});
      this.pauseView.render();

      this.timeoutControlsView = new TimeoutControlsView({el: '#timeoutControlsContainer'});
      this.timeoutControlsView.render();
      
      this.critterManaView = new CritterManaView({ el:'#critterManaContainer'});
      this.critterManaView.render();
      
      var ordial = this;
      this.listenTo(this.pauseView, 'pauseButtonClicked', function() {
        ordial.togglePause();
      });

      this.listenTo(this.timeoutControlsView, 'timeout:changed', function(event) {
        window.singletonContext.scheduler.timeout = event.timeout;
      });
    },

    togglePause: function() {
      this.paused = !this.paused;

      this.updateWorld();
      this.updatePauseButton();
      this.updateSeedView();
    },

    updateWorld: function() {
      this.worldView = new WorldView({model: window.singletonContext.world, el: '#world'});
      this.worldView.render();

      if(!this.paused){
        window.singletonContext.world.update();
        this.critterManaView.render();
        window.singletonContext.scheduler.schedule(this);
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
