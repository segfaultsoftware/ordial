var HeadlessOrdial = function(){
    singletonContext.world.update();
    this.critterManaView.render();
    singletonContext.scheduler.schedule(this);
    console.log(singletonContext.worldSerializer.serialize(singletonContext.world));
}