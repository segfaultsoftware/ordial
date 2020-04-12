require("./shims");
var $ = require("jquery");
var _ = require("underscore");
var Marionette = require("backbone.marionette");
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
var CardinalDirection = require("../lib/models/CardinalDirection");
var RelativeDirection = require("../lib/models/RelativeDirection");

var Ordial = Marionette.View.extend({
  el: $('#ordial'),
  regions: {
    seedContainer: '.seedContainer',
    pauseContainer: '#pauseContainer',
    timeoutControlsContainer: '#timeoutControlsContainer',
    world: '#world',
    runCode: '#runCode',
    saveControlsContainer: '#saveControlsContainer',
    mindGraph: '#mind-graph'
  },

  initialize: function () {
    this.paused = true;
    this.seed = new Seed();
    this.pixiLoadCallback = _.bind(function () {

      this.worldView = new WorldView({ model: singletonContext.world, el: '#world' });
      this.worldView.render();

    }, this);
  },
  onRender: function () {
    PIXI.loader.add('/sim/assets/spriteSheet/ordialSprites.json')
      .load(this.pixiLoadCallback);
    this.pauseView = new PauseView({ paused: this.paused, el: '#pauseContainer' });
    this.saveControlsView = new SaveControlsView({
      el: '#saveControlsContainer'
    });
    this.timeoutControlsView = new TimeoutControlsView({ el: '#timeoutControlsContainer' });
    this.critterManaView = new CritterGutsView({ el: '#critterGutsContainer' });
    this.pauseView.render();
    this.timeoutControlsView.render();
    this.saveControlsView.render();
    this.critterManaView.render();
    this.seedView = new SeedView({ model: this.seed, el: this.$el.find('.seedContainer')[0] });
    this.seedView.render();

    var ordial = this;
    this.listenTo(this.timeoutControlsView, 'timeout:changed', function (event) {
      singletonContext.scheduler.timeout = event.timeout;
    });
    this.listenTo(this.pauseView, 'pauseButtonClicked', function () {
      ordial.togglePause();
    });
  },

  template: function () {
    return ' <div class="seedContainer"></div>\n' +
      '    <div id="pauseContainer"></div>\n' +
      '    <div id="timeoutControlsContainer"></div>\n' +
      '    <div id="world"></div>\n' +
      '    <button class="button" id="runCode">Run Code!</button>\n' +
      '    <div id="saveControlsContainer"></div>\n' +
      '    <div id="critterGutsContainer"></div>\n' +
      '    <svg id="mind-graph"></svg>'
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
  global.CardinalDirection = CardinalDirection;
  global.RelativeDirection = RelativeDirection;
});

module.exports = Ordial;
