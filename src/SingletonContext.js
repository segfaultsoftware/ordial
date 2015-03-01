SingletonContext = function() {
  try {
    this.scheduler = new OrdialScheduler();
    this.world = new World();
    this.stimulusPackager = new StimulusPackager();
    this.resourceSpawner = new ResourceSpawner();
    this.configuration = new Configuration();
  } catch (e) {
    throw 'Syntax error in SingletonContext.initialize' + e;
  }
};