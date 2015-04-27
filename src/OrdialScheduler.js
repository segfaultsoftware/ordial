$(function() {
  OrdialScheduler = function() {
    this.schedule = function(ordial) {
      window.clearTimeout(ordial.playId);
      ordial.playId = window.setTimeout(_.bind(ordial.updateWorld, ordial), this.timeout);
    };
    this.timeout = OrdialScheduler.DEFAULT_TIMEOUT;
  };
  OrdialScheduler.DEFAULT_TIMEOUT = 1000;
});
