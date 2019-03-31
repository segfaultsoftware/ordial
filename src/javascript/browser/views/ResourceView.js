var Backbone = require("backbone");
ResourceView = Backbone.View.extend({
  className: 'tile',
  render: function () {
    this.$el.html("<div class='resource'></div>");
    return this;
  }
});

module.exports = ResourceView;