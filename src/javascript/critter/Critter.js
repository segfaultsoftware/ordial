$(function() {
  Critter = Backbone.Model.extend({
    initialize: function(options) {
      this.direction = CardinalDirection.NORTH;

      if(options && options.mind){
        this.mind = options.mind;
      } else if(options && options.genes){
        this.mind = singletonContext.mindFactory.create(options.genes);
      } else {
        this.mind = CritterMind.EmptyMind;
      }
      
      if(options && options.genes){
        this.genes = options.genes;
      } else {
        this.genes = [];
      }

      this.color = window.singletonContext.randomNumberGenerator.sample(["lavender", "black", "blue", "orange", "eggshell", "pink", "teal", "purple"]);
      var vitalOverrides = (options && options.vitals) || {};
      this.vitals = _.defaults(vitalOverrides, defaultVitals());
    },

    getActions : function(stimuli) {
      return this.mind.getActions(stimuli, this.vitals);
    },

    canEat: function(yummyMorsel) {
      return yummyMorsel instanceof Resource;
    },

    eat: function(yummyMorsel) {
      if (yummyMorsel && yummyMorsel.mana) {
        this.vitals.mana += yummyMorsel.mana;
      }
    },

    replicateGenes: function() {
      return $.extend(true, [], this.genes);
    }
  });

  Critter.Actions = {
    MOVE_FORWARD: {
      key: 'move_forward',
      cost: 10
    },
    TURN_LEFT: {
      key: 'turn left',
      cost: 5
    },
    TURN_RIGHT: {
      key: 'turn right',
      cost: 5
    },
    REPRODUCE: {
      key: 'reproduce',
      cost: 200
    },
    STARE_OFF_INTO_SPACE: {
      key: 'noop',
      cost: 1
    },
    INCREMENT_COUNTER: {
      key: 'increment counter',
      cost: 1
    },
    DECREMENT_COUNTER: {
      key: 'decrement counter',
      cost: 1
    }
  };

  function defaultVitals() {
    return {
      counter: Critter.DEFAULT_STARTING_COUNTER,
      mana: Critter.DEFAULT_STARTING_MANA
    };
  }

  Critter.DEFAULT_STARTING_COUNTER = 0;
  Critter.DEFAULT_STARTING_MANA = 50;
});
