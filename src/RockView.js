$(function() {
  RockView = Backbone.View.extend({
    render: function() {
      this.$el.html("<div class='rock'></div>");
      return this;
    }
  });
});
