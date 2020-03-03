var CardinalDirection = require("../models/CardinalDirection");
var Resource = require("../models/Resource");
var Sound = require("../models/Sound");
var _ = require('underscore');
var clonedeep = require('lodash.clonedeep');

function Critter(options) {
  this.direction = CardinalDirection.NORTH;
  if (options && options.direction) {
    this.direction = options.direction;
  }

  if (options && options.mind) {
    this.mind = options.mind;
  } else if (options && options.genes) {
    this.mind = singletonContext.mindFactory.create(options.genes);
  } else {
    this.mind = singletonContext.mindFactory.emptyMind();
  }

  if (options && options.genes) {
    this.genes = options.genes;
  } else {
    this.genes = [];
  }

  if (options && options.color) {
    this.color = options.color;
  } else {
    this.color = singletonContext.randomNumberGenerator.sample(["lavender", "black", "blue", "orange", "pink", "teal", "purple", "eggshell"]);
  }

  var vitalOverrides = (options && options.vitals) || {};
  this.vitals = _.defaults(vitalOverrides, defaultVitals());

  this.manaPerServing = Critter.DEFAULT_MANA_PER_SERVING;

  this.getActions = function (stimuli) {
    return this.mind.getActions(stimuli, this.vitals);
  }

  this.canTrample = function (thing) {
    return thing instanceof Resource || thing instanceof Sound ||
      (thing instanceof Critter && thing.isDead());
  };

  this.eat = function (yummyMorsel) {
    if (yummyMorsel && yummyMorsel.manaPerServing) {
      this.vitals.mana += yummyMorsel.manaPerServing;
    }
  }

  this.isDead = function () {
    return this.vitals.mana < 1;
  }

  this.decay = function () {
    this.vitals.decay++;
  }

  this.replicateGenes = function () {
    return clonedeep(this.genes);
  }
}

Critter.Actions = {
  MOVE_FORWARD: {
    key: 'move forward',
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
    key: 'stare off into space',
    cost: 1
  },
  INCREMENT_COUNTER: {
    key: 'increment counter',
    cost: 1
  },
  DECREMENT_COUNTER: {
    key: 'decrement counter',
    cost: 1
  },
  RESET_COUNTER: {
    key: 'reset counter',
    cost: 1
  },
  MAKE_SOUND: {
    key: 'make sound',
    cost: 1,
  },
  EAT_THING_IN_FRONT: {
    key: 'eat thing in front',
    cost: 10,
    critterConsumptionPercent: 20
  }
};

function defaultVitals() {
  return {
    counter: Critter.DEFAULT_STARTING_COUNTER,
    mana: Critter.DEFAULT_STARTING_MANA,
    decay: -1
  };
}

Critter.DEFAULT_STARTING_COUNTER = 0;
Critter.DEFAULT_STARTING_MANA = 50;
Critter.DEFAULT_MANA_PER_SERVING = 50;

module.exports = Critter;