var Backbone = require("backbone");

RockView = Backbone.View.extend({
  className: 'tile',
  render: function () {
    this.$el.html("<div class='rock'></div>");
    return this;
  }
});

module.exports = RockView;