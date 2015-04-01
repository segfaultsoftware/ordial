$(function() {
  MindFactory = Backbone.Model.extend({
    create: function(template){
      return new CritterMind({
        decisionTree: this.getNodeFromTemplateEntry(template[0])
      });
    }, 
    getNodeFromTemplateEntry: function(templateEntry){
      var nodeType = templateEntry[0];
      if(nodeType == 'action'){
        var actionNames = templateEntry[1];
        actionNames = _.isArray(actionNames) ? actionNames : [actionNames];

        return _.map(actionNames, function(actionName){
          return Critter.Actions[actionName];
        });
      } else if(nodeType == 'condition'){
        var conditionName = templateEntry[1];
        var condition = Condition.Collection[conditionName];
        return new DecisionNode(_.bind(condition.evaluate, condition));
      } else {
        throw 'unknown node type in tree: ' + nodeType;
      }
    }
  });
});