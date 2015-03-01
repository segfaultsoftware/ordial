$(function() {
  OrdialScheduler = function() {
    this.schedule = function(ordial) {
      window.clearTimeout(ordial.playId);
      ordial.playId = window.setTimeout(_.bind(ordial.updateWorld, ordial), 100);
    }
  };
});
