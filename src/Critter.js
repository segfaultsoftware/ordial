$(function() {
  Critter = Backbone.Model.extend({
    initialize: function() {
      this.direction = CardinalDirection.NORTH;
    },

    getAction : function() {
      return 'move_forward';
    }
  });

  Critter.Actions = {
    MOVE_FORWARD: 'move_forward'
  };
});
