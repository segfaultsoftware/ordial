$(function() {
  DecisionNode = Backbone.Model.extend({
    initialize: function(condition, leftNode, rightNode){
      this.condition = condition;
      this.leftNode = leftNode;
      this.rightNode = rightNode;
      this.type = DecisionNode.TYPE;
    }
  });

  DecisionNode.TYPE = "Decision";
});
