var HeadlessOrdial = function(){
  
    singletonContext = new SingletonContext();
  this.updateWorld = function(){
    singletonContext.world.update();
    singletonContext.scheduler.schedule(this);
    console.warn(singletonContext.worldSerializer.serialize(singletonContext.world));
  }
  
}

var ordial = new HeadlessOrdial();
ordial.updateWorld();
