function OrdialScheduler() {

  this.initContext = function () {
    this.timeout = OrdialScheduler.DEFAULT_TIMEOUT;
    this.timeoutId = null;
    this.paused = true;
  }

  this.pause = () => {
    clearTimeout(this.timeoutId)
    this.paused = true;
    singletonContext.eventBus.trigger('schedulerPaused')
  }

  this.resume = () => {
    this.paused = false;
    this.schedule();
    singletonContext.eventBus.trigger('schedulerResumed')
  }

  this.schedule = () => {
    clearTimeout(this.timeoutId);
    if (!this.paused) {
      this.timeoutId = setTimeout(this.scheduledBehavior, this.timeout)
    }
  };

  this.scheduledBehavior = () => {
    singletonContext.ordial.updateWorld.bind(singletonContext.ordial)()
    this.schedule();
  }
}

OrdialScheduler.DEFAULT_TIMEOUT = 1000;

module.exports = OrdialScheduler;