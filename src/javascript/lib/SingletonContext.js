_ = require("underscore");
Backbone = require("backbone");

OrdialScheduler = require("./OrdialScheduler");
World = require("./World");
StimulusPackager = require("./StimulusPackager");
ResourceSpawner = require("./ResourceSpawner");
SoundBox = require("./SoundBox");
Configuration = require("./Configuration");
CritterActuator = require("./critter/CritterActuator");
CritterUpdater = require("./critter/CritterUpdater");
CritterSerializer = require("./serializers/CritterSerializer");
WorldSerializer = require("./serializers/WorldSerializer");
WorldNavigator = require("./WorldNavigator");
MindFactory = require("./critter_production/MindFactory");
GeneMutator = require("./critter_production/GeneMutator");
SubMutator = require("./critter_production/SubMutator");
RandomNumberGenerator = require("./RandomNumberGenerator");
Scenario = require("./models/Scenario");

function SingletonContext() {
  try {
    this.scheduler = new OrdialScheduler();
    this.world = new World();
    this.stimulusPackager = new StimulusPackager();
    this.resourceSpawner = new ResourceSpawner();
    this.soundBox = new SoundBox();
    this.configuration = new Configuration();
    this.critterActuator = new CritterActuator();
    this.critterUpdater = new CritterUpdater();
    this.critterSerializer = new CritterSerializer();
    this.worldSerializer = new WorldSerializer();
    this.worldNavigator = new WorldNavigator();
    this.mindFactory = new MindFactory();
    this.geneMutator = new GeneMutator();
    this.subMutator = new SubMutator();
    this.randomNumberGenerator = new RandomNumberGenerator();
    this.eventBus = _.extend({}, Backbone.Events);
  } catch (e) {
    throw 'Syntax error in SingletonContext.initialize' + e;
  }
  this.initContext = function(){
    _.each(Object.keys(this), (key)=>{
      if(this[key]["initContext"]){
        this[key].initContext.bind(this[key])(this);
      }
    });
  };
  setImmediate(this.initContext.bind(this));
};
module.exports = SingletonContext;