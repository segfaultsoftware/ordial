var HeadlessOrdial = function(){
    var singletonContext = new SingletonContext();
    singletonContext.world.update();
    singletonContext.scheduler.schedule(this);
    console.log(singletonContext.worldSerializer.serialize(singletonContext.world));
}