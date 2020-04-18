function OrdialScheduler() {
  this.pause = function () {
    clearTimeout(this.timeoutId)
    this.paused = true;
  }

  this.schedule = function () {
    clearTimeout(this.timeoutId);
    if (!this.paused) {
      this.timeoutId = setTimeout(this.scheduledBehavior, this.timeout)
    }
  };

  this.initContext = function (singletonContext) {
    this.scheduledBehavior = () => {
      singletonContext.ordial.updateWorld.bind(singletonContext.ordial)()
      this.schedule();
    }
    this.timeout = OrdialScheduler.DEFAULT_TIMEOUT;
    this.timeoutId = null;
    this.paused = true;
  }
}

OrdialScheduler.DEFAULT_TIMEOUT = 1000;

module.exports = OrdialScheduler;