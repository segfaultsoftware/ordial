$(function() {
  Condition = Backbone.Model.extend({
    initialize: function(sensoryGroup, propertyName, comparatorName, rightValue ) {
      this.sensoryGroup = sensoryGroup;
      this.propertyName = propertyName;
      this.comparator = Condition.Comparators[comparatorName] || Condition.Comparators.Exists;
      this.rightValue = rightValue;
    },
    evaluate: function evaluate(stimuli, vitals){
      var sensoryGroups = {stimuli:stimuli, vitals:vitals};
      var propertyValue = sensoryGroups[this.sensoryGroup][this.propertyName];
      if(!sensoryGroups[this.sensoryGroup].hasOwnProperty(this.propertyName)){
        console.warn('property "' + this.propertyName + '" not found in ' + this.sensoryGroup);
      }
      return this.comparator(propertyValue, this.rightValue);
    }
  });
  
  Condition.Comparators = {
    Exists: function(value){
      return !! value;
    },
    Equals: function(first, second){
      return first == second;
    },
    IsA: function(object, className){
      return object instanceof eval(className)
    }
  };
  
  
  Condition.Collection = {
    resourceInFront: new Condition('stimuli', 'thingInFrontOfMe', 'IsA', 'Resource'),
    resourceToTheRight: new Condition('stimuli', 'thingToTheRightOfMe', 'IsA', 'Resource'),
    resourceToTheLeft: new Condition('stimuli', 'thingToTheLeftOfMe', 'IsA', 'Resource'),
    
    critterInFront: new Condition('stimuli', 'thingInFrontOfMe', 'IsA', 'Critter'),
    critterToTheRight: new Condition('stimuli', 'thingToTheRightOfMe', 'IsA', 'Critter'),
    critterToTheLeft: new Condition('stimuli', 'thingToTheLeftOfMe', 'IsA', 'Critter'),
    
    thingInFront: new Condition('stimuli', 'thingInFrontOfMe'),
    thingToTheRight: new Condition('stimuli', 'thingToTheRightOfMe'),
    thingToTheLeft: new Condition('stimuli', 'thingToTheLeftOfMe'),
    
    mana10: new Condition('vitals', 'mana', 'Equals', 10),
    mana5: new Condition('vitals', 'mana', 'Equals', 5),
    mana1: new Condition('vitals', 'mana', 'Equals', 1),
    mana20: new Condition('vitals', 'mana', 'Equals', 20),
    
    counter0: new Condition('vitals', 'counter', 'Equals', 0),
    counter1: new Condition('vitals', 'counter', 'Equals', 1),
    counter2: new Condition('vitals', 'counter', 'Equals', 2),
    counter3: new Condition('vitals', 'counter', 'Equals', 3),
    counter5: new Condition('vitals', 'counter', 'Equals', 5),
    counter10: new Condition('vitals', 'counter', 'Equals', 10),
    counter20: new Condition('vitals', 'counter', 'Equals', 20),
    counter80: new Condition('vitals', 'counter', 'Equals', 80),
  };
});