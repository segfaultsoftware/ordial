var Marionette = require("backbone.marionette");
var _ = require('underscore');

SeedView = Marionette.View.extend({
  events: {
    'blur .seed-input': 'saveSeed',
  },

  template: JST['src/viewTemplates/seedView.template.html'],

  disableInput: function () {
    if (!this.model.get('isFinalized')) {
      this.model.set('isFinalized', true);
      this.model.seedRandom();
    }
  },

  saveSeed: function () {
    this.model.set('seedValue', this.$el.find('.seed-input').val());
  },
});

module.exports = SeedView;