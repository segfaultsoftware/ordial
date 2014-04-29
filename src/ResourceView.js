$(function() {
  ResourceView = Backbone.View.extend({
    render: function() {
      this.$el.html("<div class='resource'></div>");
      return this;
    }
  });
});
