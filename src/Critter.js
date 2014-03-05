$(function() {
  Critter = Backbone.Model.extend({
    initialize: function(options) {
      this.direction = CardinalDirection.NORTH;
      this.mind = (options && options.mind) ? options.mind : CritterMind.EmptyMind;
      this.mana = (options && options.mana) ? options.mana : Critter.DEFAULT_STARTING_MANA;
    },

    getAction : function() {
      return this.mind.getAction();
    }
  });

  Critter.Actions = {
    MOVE_FORWARD: 'move_forward',
    TURN_LEFT: 'turn left',
    REPRODUCE: 'reproduce',
    STARE_OFF_INTO_SPACE: 'noop'
  };

  Critter.DEFAULT_STARTING_MANA = 10;
});
