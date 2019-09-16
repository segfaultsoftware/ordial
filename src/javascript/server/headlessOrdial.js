var SingletonContext = require("../lib/SingletonContext");

var HeadlessOrdial = function () {

  singletonContext = new SingletonContext();
  this.updateWorld = function () {
    singletonContext.world.update();
    // singletonContext.scheduler.schedule(this);
  }

};

var ordial = new HeadlessOrdial();
ordial.updateWorld();