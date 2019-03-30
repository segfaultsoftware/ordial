var Critter = require("../critter/Critter");
var CritterMind = require("../critter/CritterMind");
var Condition = require("../critter/Condition");
var DecisionNode = require("../critter/DecisionNode");
var _ = require("underscore");

function MindFactory() {
  this.emptyMind = function () {
    return CritterMind.EmptyMind;
  };

  this.create = function (template) {
    return new CritterMind({
      decisionTree: this.getNodeWithChildren(template, 0)
    });
  }

  this.getNodeFromTemplateEntry = function (templateEntry) {
    var nodeType = templateEntry[0];
    if (nodeType == 'action') {
      var actionNames = templateEntry[1];
      actionNames = _.isArray(actionNames) ? actionNames : [actionNames];

      var actions = _.map(actionNames, function (actionName) {
        return Critter.Actions[actionName];
      });
      if (actions.length == 1) {
        if (!actions[0]) {
          console.warn("no action to map for " + templateEntry);
        }
        return actions[0];
      } else if (actions.length == 0) {
        return Critter.Actions.STARE_OFF_INTO_SPACE;
      } else {
        return actions;
      }
    } else if (nodeType == 'condition') {
      var conditionName = templateEntry[1];
      var condition = Condition.Collection[conditionName];
      if (!condition) {
        console.error('invalid condition name: "' + conditionName + '"');
        throw 'invalid condition name: "' + conditionName + '"';
      }

      return new DecisionNode(_.bind(condition.evaluate, condition));
    } else {
      console.error('unknown node type in tree: ' + nodeType);
      throw 'unknown node type in tree: ' + nodeType;
    }
  }

  this.getLeftNode = function (template, parentIndex) {
    return this.getNodeWithChildren(template, 2 * parentIndex + 1);
  }

  this.getRightNode = function (template, parentIndex) {
    return this.getNodeWithChildren(template, 2 * parentIndex + 2);
  }

  this.getNodeWithChildren = function (template, index) {
    var templateEntry = template[index];
    if (templateEntry) {
      var node = this.getNodeFromTemplateEntry(templateEntry);
      node.leftNode = this.getLeftNode(template, index);
      node.rightNode = this.getRightNode(template, index);
      return node;
    } else {
      return null;
    }
  }
}

module.exports = MindFactory;