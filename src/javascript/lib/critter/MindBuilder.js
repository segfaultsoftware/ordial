var MindBuilder = function(){

  this.condition = function(condition){
    this.template.push(condition);
  }
  this.build = function(){
    singletonContext.mindFactory.create(template);
  }
}