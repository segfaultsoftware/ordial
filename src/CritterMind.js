$(function() {
  CritterMind = Backbone.Model.extend({
    initialize: function(action) {
      this.action = action;
    },

    getAction : function() {
      return this.action;
    }
  });

  CritterMind.EmptyMind = new CritterMind(Critter.Actions.STARE_OFF_INTO_SPACE);
});
