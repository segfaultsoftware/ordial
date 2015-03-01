SingletonContext = function() {
  this.scheduler = new OrdialScheduler();
  this.world = new World();
  this.stimulusPackager = new StimulusPackager();
};