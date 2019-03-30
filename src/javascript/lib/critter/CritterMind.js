var DecisionNode = require("./DecisionNode")
var Critter = require('./Critter');

function CritterMind(options) {
  if (options && options.decisionTree) {
    this.decisionTree = options.decisionTree;
  } else if (options && options.action) {
    this.decisionTree = options.action;
  } else {
    this.decisionTree = Critter.Actions.STARE_OFF_INTO_SPACE;
  }

  this.getActionsForNode = function (stimuli, vitals, currentNode) {
    if (!currentNode) {
      return Critter.Actions.STARE_OFF_INTO_SPACE;
    } else if (currentNode.type === DecisionNode.TYPE) {
      if (currentNode.condition(stimuli, vitals)) {
        return this.getActionsForNode(stimuli, vitals, currentNode.leftNode);
      } else {
        return this.getActionsForNode(stimuli, vitals, currentNode.rightNode);
      }
    } else {
      return currentNode;
    }
  }

  this.getActions = function (stimuli, vitals) {
    var currentNode = this.decisionTree;
    return this.getActionsForNode(stimuli, vitals, currentNode);

  }
}

CritterMind.EmptyMind = new CritterMind({ action: Critter.Actions.STARE_OFF_INTO_SPACE });

module.exports = CritterMind;
