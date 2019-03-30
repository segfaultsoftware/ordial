var Condition = require("../../../src/javascript/lib/critter/Condition");

describe("Condition", function(){
  describe("#evaluator", function(){
    var stimuli, vitals;
    beforeEach(function(){
      stimuli = { someSense:null};
      vitals = { someVital:null};
    });
    describe("for stimuli", function(){
      var condition;
      beforeEach(function(){
        condition = new Condition('stimuli', 'someSense');
      });

      it("returns false", function(){
        expect(condition.evaluate({})).toBe(false);
      });

      describe("when the left value is truthy", function(){
        it("returns true", function(){
          var stimuli = {someSense: 'some value'};
          expect(condition.evaluate(stimuli, vitals)).toBe(true);
        });
      });
    });

    describe("for vitals", function(){
      var condition;
      beforeEach(function(){
        condition = new Condition('vitals', 'someVital');
      });

      it("returns false", function(){
        expect(condition.evaluate(stimuli, vitals)).toBe(false);
      });

      describe("when the left value is truthy", function(){
        it("returns true", function(){
          var vitals = {someVital: 'some value'};
          expect(condition.evaluate(stimuli, vitals)).toBe(true);
        });
      });
    });

    describe("comparing with IsA", function(){
      var condition, SomeType;
      beforeEach(function(){
        SomeType = function SomeType(){};
        condition = new Condition('stimuli','someSense', 'IsA', 'SomeType');
      });
      it("returns false", function(){
        expect(condition.evaluate(stimuli, vitals)).toBe(false);
      });
      describe("when the stimulus is an instance of the named class", function(){
        beforeEach(function(){
          stimuli.someSense = new SomeType();
        });
        
        it("returns true", function(){
          expect(condition.evaluate(stimuli, vitals)).toBe(true);
        });
      });
    });

    describe("comparing with Equals", function(){
      var condition;
      beforeEach(function(){
        condition = new Condition('stimuli','someSense', 'Equals', 1234);
      });
      it("returns false", function(){
        expect(condition.evaluate(stimuli, vitals)).toBe(false);
      });
      describe("when the sense has the equivalent value", function(){
        beforeEach(function(){
          stimuli.someSense = 1234;
        });
        
        it("returns true", function(){
          expect(condition.evaluate(stimuli, vitals)).toBe(true);
        });
      });
    });

    describe("comparing with LessThan", function(){
      var condition;
      beforeEach(function(){
        condition = new Condition('stimuli','someSense', 'LessThan', 1234);
      });

      describe("when the sense has the lesser value", function(){
        beforeEach(function(){
          stimuli.someSense = 1233;
        });

        it("returns true", function(){
          expect(condition.evaluate(stimuli, vitals)).toBe(true);
        });
      });

      describe("when the sense has the greater value", function(){
        beforeEach(function(){
          stimuli.someSense = 1235;
        });

        it("returns false", function(){
          expect(condition.evaluate(stimuli, vitals)).toBe(false);
        });
      });
    });
  });
});
