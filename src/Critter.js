$(function() {
  Critter = Backbone.Model.extend({
    initialize: function(options) {
      this.direction = CardinalDirection.NORTH;
      this.mind = (options && options.mind) ? options.mind : CritterMind.EmptyMind;
    },

    getAction : function() {
      return this.mind.getAction();
    }
  });

  Critter.Actions = {
    MOVE_FORWARD: 'move_forward',
    TURN_LEFT: 'turn left',
    STARE_OFF_INTO_SPACE: 'noop'
  };
});
