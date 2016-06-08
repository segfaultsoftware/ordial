$(function() {
  Ordial = Backbone.View.extend({
    el: $('#ordial'),

    initialize: function() {
      this.paused = true;

      PIXI.loader.add('/src/assets/spriteSheet/ordialSprites.json')
        .load(_.bind(function(){

          this.worldView = new WorldView({model: singletonContext.world, el: '#world'});
          this.worldView.render();

        }, this));


      this.seedView = new SeedView({model: new Seed(), el:'#seedContainer'});
      this.seedView.render();

      this.pauseView = new PauseView({paused: this.paused, el:'#pauseContainer'});
      this.pauseView.render();

      this.timeoutControlsView = new TimeoutControlsView({el: '#timeoutControlsContainer'});
      this.timeoutControlsView.render();
      this.saveControlsView = new SaveControlsView({
        el: '#saveControlsContainer'});
      this.saveControlsView.render();

      this.critterManaView = new CritterGutsView({ el:'#critterManaContainer'});
      this.critterManaView.render();

      var ordial = this;
      this.listenTo(this.pauseView, 'pauseButtonClicked', function() {
        ordial.togglePause();
      });

      this.listenTo(this.timeoutControlsView, 'timeout:changed', function(event) {
        singletonContext.scheduler.timeout = event.timeout;
      });
    },

    togglePause: function() {
      this.paused = !this.paused;

      this.updateWorld();
      this.updatePauseButton();
      this.updateSeedView();
    },

    updateWorld: function() {
      if(this.worldView){
        this.worldView.render();
      }

      if(!this.paused){
        singletonContext.world.update();
        this.critterManaView.render();
        singletonContext.scheduler.schedule(this);
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