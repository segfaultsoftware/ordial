SingletonContext = function() {
  try {
    this.scheduler = new OrdialScheduler();
    this.world = new World();
    this.stimulusPackager = new StimulusPackager();
    this.resourceSpawner = new ResourceSpawner();
    this.configuration = new Configuration();
    this.critterActuator = new CritterActuator();
    this.critterSerializer = new CritterSerializer();
    this.worldSerializer = new WorldSerializer();
    this.mindFactory = new MindFactory();
    this.geneMutator = new GeneMutator();
    this.subMutator = new SubMutator();
    this.randomNumberGenerator = new RandomNumberGenerator();
    this.eventBus = _.extend({}, Backbone.Events);
  } catch (e) {
    throw 'Syntax error in SingletonContext.initialize' + e;
  }
};