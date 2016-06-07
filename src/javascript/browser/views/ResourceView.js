$(function() {
  ResourceView = Backbone.View.extend({
    className: 'tile',
    render: function() {
      this.$el.html("<div class='resource'></div>");
      return this;
    }
  });
});
