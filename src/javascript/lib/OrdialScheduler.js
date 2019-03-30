function OrdialScheduler() {
  this.timeout = OrdialScheduler.DEFAULT_TIMEOUT;

  this.schedule = function (ordial) {
    clearTimeout(ordial.playId);
    ordial.playId = setTimeout(_.bind(ordial.updateWorld, ordial), this.timeout);
  };
}

OrdialScheduler.DEFAULT_TIMEOUT = 1000;

module.exports = OrdialScheduler;