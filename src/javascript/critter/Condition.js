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
    LessThan: function(first, second){
      return first < second;
    },
    IsA: function(object, className){
      return object instanceof eval(className);
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

    manaUnder100: new Condition('vitals', 'mana', 'LessThan', 100),
    manaUnder50: new Condition('vitals', 'mana', 'LessThan', 50),
    manaUnder10: new Condition('vitals', 'mana', 'LessThan', 10),
    manaUnder200: new Condition('vitals', 'mana', 'LessThan', 200),
    manaUnder300: new Condition('vitals', 'mana', 'LessThan', 300),
    manaUnder400: new Condition('vitals', 'mana', 'LessThan', 400),

    counter0: new Condition('vitals', 'counter', 'Equals', 0),
    counter1: new Condition('vitals', 'counter', 'Equals', 1),

    counterUnder0: new Condition('vitals', 'counter', 'LessThan', 0),
    counterUnder1: new Condition('vitals', 'counter', 'LessThan', 1),
    counterUnder2: new Condition('vitals', 'counter', 'LessThan', 2),
    counterUnder5: new Condition('vitals', 'counter', 'LessThan', 5),
    counterUnder10: new Condition('vitals', 'counter', 'LessThan', 10),
    counterUnder30: new Condition('vitals', 'counter', 'LessThan', 20),
    counterUnder80: new Condition('vitals', 'counter', 'LessThan', 80),
    counterUnder200: new Condition('vitals', 'counter', 'LessThan', 200),
  };
});
