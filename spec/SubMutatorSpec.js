describe("SubMutator", function(){
  var mutator, actions;
  beforeEach(function(){
    mutator = new SubMutator();
    actions = [1,2,3,4,5];
  });
  
  describe('#mutate', function() {
    describe("selecting a type of mutation", function(){
      var swapResult, insertResult, removeResult, replaceResult;
      beforeEach(function(){
        swapResult = ['swapped'];
        insertResult = ['inserted'];
        removeResult = ['removed'];
        replaceResult = ['replace'];

        spyOn(mutator, 'swap').and.returnValue(swapResult);
        spyOn(mutator, 'insert').and.returnValue(insertResult);
        spyOn(mutator, 'remove').and.returnValue(removeResult);
        spyOn(mutator, 'replace').and.returnValue(replaceResult);
      });

      it("can swap", function(){
        window.singletonContext.randomNumberGenerator.stubRandom([0]);
        var result = mutator.mutate(actions);
        expect(mutator.swap).toHaveBeenCalledWith(actions);
        expect(result).toBe(swapResult);
      });

      it("can insert", function(){
        window.singletonContext.randomNumberGenerator.stubRandom([1]);
        var result = mutator.mutate(actions);
        expect(mutator.insert).toHaveBeenCalledWith(actions);
        expect(result).toBe(insertResult);
      });

      it("can remove", function(){
        window.singletonContext.randomNumberGenerator.stubRandom([2]);
        var result = mutator.mutate(actions);
        expect(mutator.remove).toHaveBeenCalledWith(actions);
        expect(result).toBe(removeResult);
      });

      it("can replace", function() {
        window.singletonContext.randomNumberGenerator.stubRandom([3]);
        var result = mutator.mutate(actions);
        expect(mutator.replace).toHaveBeenCalledWith(actions);
        expect(result).toBe(replaceResult);
      });
    });
  });

  describe("#swap", function(){
    beforeEach(function() {
      window.singletonContext.randomNumberGenerator.stubRandom([2, 4, 1, 4]);
    });

    it("randomly swaps an action into a new location", function(){
      var result = mutator.swap(actions);
      expect(result).toEqual([ 1, 2, 5, 4, 3 ]);

      result = mutator.swap(actions);
      expect(result).toEqual([ 1, 3, 5, 4, 2]);
    });
  });

  describe("#insert", function(){
    it("inserts an action", function(){
      var originalLength = actions.length;
      var result = mutator.insert(actions);
      expect(result.length).toBe(originalLength + 1);
      expect(actions).toBe(result);
    });

    it("inserts an action at a random position", function(){
      var newAction = 'SOME_ACTION';
      spyOn(mutator, 'randomAction').and.returnValue(newAction);

      window.singletonContext.randomNumberGenerator.stubRandom([4]);
      var result = mutator.insert(actions);
      expect(result[4]).toEqual(newAction);

      window.singletonContext.randomNumberGenerator.stubRandom([0]);
      result = mutator.insert(actions);
      expect(result[0]).toEqual(newAction);
    });

    it("can insert a random action", function(){
      var action = 'SOME_ACTION';
      spyOn(mutator, 'randomAction').and.returnValue(action);
      window.singletonContext.randomNumberGenerator.stubRandom([1]);
      var result = mutator.insert(actions);
      expect(result.indexOf(action)).not.toBe(-1);
    });
  });

  describe("#remove", function(){
    it("randomly removes an action", function(){
      window.singletonContext.randomNumberGenerator.stubRandom([2]);
      var result = mutator.remove(actions);
      expect(result).toEqual([1,2,4,5]);

      window.singletonContext.randomNumberGenerator.stubRandom([3]);
      var result = mutator.remove(actions);
      expect(result).toEqual([1,2,4]);
    });

    describe("when it removes the last action from the array", function(){
      it("leaves STARE_OFF_INTO_SPACE", function(){
        var result = mutator.remove(['SOME_ACTION']);
        expect(result).toEqual(['STARE_OFF_INTO_SPACE']);
      });
    })
  });

  describe("#replace", function() {
    it("changes the value of a random action", function() {
      spyOn(mutator, 'randomAction').and.returnValue('FOO_ACTION');
      window.singletonContext.randomNumberGenerator.stubRandom([2]);
      var result = mutator.replace(actions);
      expect(result.length).toEqual(5);
      var indexOfNewAction = result.indexOf('FOO_ACTION');
      expect(indexOfNewAction).not.toEqual(-1);
    });
  });
});
