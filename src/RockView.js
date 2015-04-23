$(function() {
  RockView = Backbone.View.extend({
    className: 'tile',
    render: function() {
      this.$el.html("<div class='rock'></div>");
      return this;
    }
  });
});
