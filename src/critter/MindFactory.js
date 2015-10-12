$(function() {
  MindFactory = Backbone.Model.extend({
    create: function(template){
      return new CritterMind({
        decisionTree: this.getNodeWithChildren(template, 0)
      });
    }, 
    getNodeFromTemplateEntry: function(templateEntry){
      var nodeType = templateEntry[0];
      if(nodeType == 'action'){
        var actionNames = templateEntry[1];
        actionNames = _.isArray(actionNames) ? actionNames : [actionNames];

        var actions = _.map(actionNames, function(actionName){
          return Critter.Actions[actionName];
        });
        if(actions.length == 1){
          return actions[0];
        } else {
          return actions;
        }
      } else if(nodeType == 'condition'){
        var conditionName = templateEntry[1];
        var condition = Condition.Collection[conditionName];
        if(!condition){
          throw 'invalid condition name: "' + conditionName + '"';
        }
        
        return new DecisionNode(_.bind(condition.evaluate, condition));
      } else {
        throw 'unknown node type in tree: ' + nodeType;
      }
    },
    
    getLeftNode: function(template, parentIndex){
      return this.getNodeWithChildren(template, 2*parentIndex + 1);
    },
    getRightNode: function(template, parentIndex){
      return this.getNodeWithChildren(template, 2*parentIndex + 2);
    },
    getNodeWithChildren: function(template, index){
      var templateEntry = template[index];
      if(templateEntry){
        var node = this.getNodeFromTemplateEntry(templateEntry);
        node.leftNode = this.getLeftNode(template, index);
        node.rightNode = this.getRightNode(template, index);
        return node;
      } else {
        return null;
      }
    }
  });
});
