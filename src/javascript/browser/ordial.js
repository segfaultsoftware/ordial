require("./shims");
var $ = require("jquery");
var _ = require("underscore");
var SeedView = require("./views/SeedView");
var PauseView = require("./views/PauseView");
var CritterGutsView = require("./CritterGutsView");
var WorldView = require("./views/WorldView");
var SaveControlsView = require("./views/SaveControlsView");
var TimeoutControlsView = require("./views/TimeoutControlsView");
var Seed = require("../lib/models/Seed");
var Backbone = require("backbone");
var SingletonContext = require("../lib/SingletonContext");
var Resource = require("../lib/models/Resource");
var Rock = require("../lib/models/Rock");
var Critter = require("../lib/critter/Critter");

var Ordial = Backbone.View.extend({
  el: $('#ordial'),

  initialize: function () {
    this.paused = true;

    PIXI.loader.add('/assets/spriteSheet/ordialSprites.json')
      .load(_.bind(function () {

        this.worldView = new WorldView({ model: singletonContext.world, el: '#world' });
        this.worldView.render();

      }, this));


    this.seedView = new SeedView({ model: new Seed(), el: '#seedContainer' });

    this.pauseView = new PauseView({ paused: this.paused, el: '#pauseContainer' });

    this.timeoutControlsView = new TimeoutControlsView({ el: '#timeoutControlsContainer' });
    this.saveControlsView = new SaveControlsView({
      el: '#saveControlsContainer'
    });

    this.critterManaView = new CritterGutsView({ el: '#critterGutsContainer' });

    var ordial = this;
    this.listenTo(this.pauseView, 'pauseButtonClicked', function () {
      ordial.togglePause();
    });

    this.listenTo(this.timeoutControlsView, 'timeout:changed', function (event) {
      singletonContext.scheduler.timeout = event.timeout;
    });
    this.seedView.render();
    this.pauseView.render();
    this.timeoutControlsView.render();
    this.saveControlsView.render();
    this.critterManaView.render();
  },

  togglePause: function () {
    this.paused = !this.paused;

    this.updateWorld();
    this.updatePauseButton();
    this.updateSeedView();
  },

  updateWorld: function () {
    if (this.worldView) {
      this.worldView.render();
    }

    if (!this.paused) {
      singletonContext.world.update();
      this.critterManaView.render();
      singletonContext.scheduler.schedule(this);
    }
  },

  updatePauseButton: function () {
    this.pauseView.paused = this.paused;
    this.pauseView.render();
  },

  updateSeedView: function () {
    this.seedView.disableInput();
    this.seedView.render();
  }
});


$(function () {
  global.SingletonContext = SingletonContext;
  global.Resource = Resource;
  global.Rock = Rock;
  global.Critter = Critter;
  global.Ordial = Ordial;
});

module.exports = Ordial;
