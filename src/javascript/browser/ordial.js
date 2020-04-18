require("./shims");
var $ = require("jquery");
var _ = require("underscore");
var SeedView = require("./views/SeedView");
var PauseView = require("./views/PauseView");
var CritterGutsView = require("./CritterGutsView");
var WorldView = require("./views/WorldView");
var SaveControlsView = require("./views/SaveControlsView");
var TimeoutControlsView = require("./views/TimeoutControlsView");
var ScenarioSelectionView = require("./views/ScenarioSelectionView");
var Seed = require("../lib/models/Seed");
var Backbone = require("backbone");
var SingletonContext = require("../lib/SingletonContext");
var Resource = require("../lib/models/Resource");
var Rock = require("../lib/models/Rock");
var Critter = require("../lib/critter/Critter");
var Scenario = require("../lib/models/Scenario");
var CardinalDirection = require("../lib/models/CardinalDirection");
var RelativeDirection = require("../lib/models/RelativeDirection");

var Ordial = Backbone.View.extend({
  el: $('#ordial'),

  initContext: function (singletonContext) {
    singletonContext.ordial = this;

    PIXI.loader.add('/sim/assets/spriteSheet/ordialSprites.json')
      .load(_.bind(function () {

        this.worldView = new WorldView({ model: singletonContext.world, el: '#world' });
        this.worldView.render();

      }, this));


    this.seedView = new SeedView({ model: new Seed(), el: '#seedContainer' });

    this.pauseView = new PauseView({ model: singletonContext.scheduler, el: '#pauseContainer' });

    this.timeoutControlsView = new TimeoutControlsView({ el: '#timeoutControlsContainer' });
    this.saveControlsView = new SaveControlsView({
      el: '#saveControlsContainer'
    });

    this.critterGutsView = new CritterGutsView({ el: '#critterGutsContainer' });
    this.scenarioSelectionView = new ScenarioSelectionView({
      el: '#scenarioSelectionContainer',
      model: { scenarios: Scenario.defaultScenarios() }
    });

    var ordial = this;
    this.listenTo(this.pauseView, 'pauseButtonClicked', function () {
      ordial.updateSeedView();
    });

    this.listenTo(this.timeoutControlsView, 'timeout:changed', function (event) {
      singletonContext.scheduler.timeout = event.timeout;
    });
    this.seedView.render();
    this.pauseView.render();
    this.timeoutControlsView.render();
    this.saveControlsView.render();
    this.critterGutsView.render();
    this.scenarioSelectionView.render();
  },

  updateWorld: function () {
    if (this.worldView) {
      this.worldView.render();
    }

    singletonContext.world.update();
    this.critterGutsView.render();
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
