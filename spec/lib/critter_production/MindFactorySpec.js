var Critter = require("../../../src/javascript/lib/critter/Critter");
var MindFactory = require("../../../src/javascript/lib/critter_production/MindFactory");

describe("MindFactory", function(){
  var mindFactory, stimuli, vitals;
  beforeEach(function(){
    stimuli = {};
    vitals = {};
    mindFactory = new MindFactory();
  });

  describe("#create", function(){
    describe("when the first item in the array is an action", function(){
      it("creates a mind with an action", function(){
        expect(mindFactory.create([
          ['action', 'MOVE_FORWARD']
        ]).getActions(stimuli, vitals))
          .toEqual(Critter.Actions.MOVE_FORWARD); 
      });

      describe("when the action is empty", function(){
        it("returns the STARE_OFF_INTO_SPACE action", function(){
          expect(mindFactory.create([
            ['action', []]
          ]).getActions(stimuli, vitals))
            .toEqual(Critter.Actions.STARE_OFF_INTO_SPACE);
        });
      });
    });

    describe("when the first item is a condition", function(){
      var mind;
      beforeEach(function(){
        mind = mindFactory.create([
          ['condition', 'counter1'], 
          ['action', 'TURN_LEFT'],
          ['action', 'TURN_RIGHT']
        ]);
      });

      it("creates a mind with that condition as the root", function(){
        vitals.counter = 1;
        expect(mind.getActions(stimuli, vitals)).toEqual(Critter.Actions.TURN_LEFT);
        vitals.counter = 0;
        expect(mind.getActions(stimuli, vitals)).toEqual(Critter.Actions.TURN_RIGHT);
      });
      
      describe("when the condition is not a valid predefined condition", function(){
        it("throws an appropriate error", function(){
          expect(function(){
            mindFactory.create([['condition', 'isAsdfLol']]);
          }).toThrow('invalid condition name: "isAsdfLol"');
        });
      });
    });

    describe("when the first item is multiple actions", function(){
      it("creates a mind with those action", function(){
        var actions = mindFactory.create([
          ['action', ['MOVE_FORWARD', 'TURN_LEFT']]
        ]).getActions(stimuli, vitals);
        expect(actions.length).toBe(2);
        expect(actions[0]).toBe(Critter.Actions.MOVE_FORWARD);
        expect(actions[1]).toBe(Critter.Actions.TURN_LEFT);
      });
    });
  });
});
