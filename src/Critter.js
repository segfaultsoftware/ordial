$(function() {
  Critter = Backbone.Model.extend({
    getAction : function() {
      return 'move_forward';
    }
  });

  Critter.Actions = {
    MOVE_FORWARD: 'move_forward'
  };
});