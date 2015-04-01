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
          ['action', 'MOVE_FORWARD'], 
          ['condition', 'IGNORED_VALUE']
        ]).getActions(stimuli, vitals))
          .toEqual([Critter.Actions.MOVE_FORWARD]); 
      });
    });

    xdescribe("when the first item is a condition", function(){
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
    });

    describe("when the first item is multiple actions", function(){
      it("creates a mind with those action", function(){
        expect(mindFactory.create([
          ['action', ['MOVE_FORWARD', 'TURN_LEFT']], 
          ['condition', 'IGNORED_VALUE']
        ]).getActions(stimuli, vitals))
          .toEqual([Critter.Actions.MOVE_FORWARD, 
                    Critter.Actions.TURN_LEFT]); 
      });
    });
  });
});