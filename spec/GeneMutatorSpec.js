describe("GeneMutator", function(){
  var mutator, genes;
  beforeEach(function(){
    mutator = new GeneMutator();
    genes = [1,2,3,4,5];
  });

  describe("#mutate", function(){
    it("returns the passed in genes", function(){
      expect(mutator.mutate(genes)).toBe(genes);
    });
    
    describe("selecting a type of mutation", function(){
      var swapResult, insertResult, removeResult, replaceResult, subMutateResult;
      beforeEach(function(){
        swapResult = ['swapped'];
        insertResult = ['inserted'];
        removeResult = ['removed'];
        replaceResult = ['replace'];
        subMutateResult = ['subMutate'];

        spyOn(mutator, 'swap').and.returnValue(swapResult);
        spyOn(mutator, 'insert').and.returnValue(insertResult);
        spyOn(mutator, 'remove').and.returnValue(removeResult);
        spyOn(mutator, 'replace').and.returnValue(replaceResult);
        spyOn(mutator, 'subMutate').and.returnValue(subMutateResult);
      });

      it("can swap", function(){
        singletonContext.randomNumberGenerator.stubRandom([0]);
        var result = mutator.mutate(genes);
        expect(mutator.swap).toHaveBeenCalledWith(genes);
        expect(result).toBe(swapResult);
      });

      it("can insert", function(){
        singletonContext.randomNumberGenerator.stubRandom([1]);
        var result = mutator.mutate(genes);
        expect(mutator.insert).toHaveBeenCalledWith(genes);
        expect(result).toBe(insertResult);
      });

      it("can remove", function(){
        singletonContext.randomNumberGenerator.stubRandom([2]);
        var result = mutator.mutate(genes);
        expect(mutator.remove).toHaveBeenCalledWith(genes);
        expect(result).toBe(removeResult);
      });

      it("can replace", function() {
        singletonContext.randomNumberGenerator.stubRandom([3]);
        var result = mutator.mutate(genes);
        expect(mutator.replace).toHaveBeenCalledWith(genes);
        expect(result).toBe(replaceResult);
      });

      it("can subMutate", function() {
        singletonContext.randomNumberGenerator.stubRandom([4]);
        var result = mutator.mutate(genes);
        expect(mutator.subMutate).toHaveBeenCalledWith(genes);
        expect(result).toBe(subMutateResult);
      });
    });
  });

  describe("#swap", function(){
    describe("when there are several genes", function(){
      beforeEach(function() {
        singletonContext.randomNumberGenerator.stubRandom([2, 4, 1, 4]);
      });

      it("randomly swaps a gene into a new location", function(){
        var result = mutator.swap(genes);
        expect(result).toEqual([ 1, 2, 5, 4, 3 ]);

        result = mutator.swap(genes);
        expect(result).toEqual([ 1, 3, 5, 4, 2]);
      });
    });

    describe("when there are no genes", function(){
      beforeEach(function(){
        genes = [];
      });

      it("returns an empty array", function(){
        expect(mutator.swap(genes)).toEqual([]);
      });
    });
  });

  describe("#insert", function(){
    it("inserts a gene", function(){
      var originalLength = genes.length;
      var result = mutator.insert(genes);
      expect(result.length).toBe(originalLength + 1);
      expect(genes).toBe(result);
    });

    it("inserts a gene at a random position", function(){

      var newGene = ['some', 'gene'];
      spyOn(mutator, 'randomGene').and.returnValue(newGene);

      singletonContext.randomNumberGenerator.stubRandom([4]);
      var result = mutator.insert(genes);
      expect(result[4]).toEqual(newGene);

      singletonContext.randomNumberGenerator.stubRandom([0]);
      result = mutator.insert(genes);
      expect(result[0]).toEqual(newGene);
    });

    it("can insert a random action", function(){
      var actionGene = ['action', 'SOME_ACTION'];
      spyOn(mutator, 'randomAction').and.returnValue(actionGene);
      singletonContext.randomNumberGenerator.stubRandom([1]);
      var result = mutator.insert(genes);
      expect(result.indexOf(actionGene)).not.toBe(-1);
    });

    it("can insert a random condition", function(){
      var conditionGene = ['condition', 'someCondition'];
      spyOn(mutator, 'randomCondition').and.returnValue(conditionGene);
      singletonContext.randomNumberGenerator.stubRandom([0]);
      var result = mutator.insert(genes);
      expect(result.indexOf(conditionGene)).not.toBe(-1);
    });
  });

  describe("#remove", function(){
    it("randomly removes a gene", function(){
      singletonContext.randomNumberGenerator.stubRandom([2]);
      var result = mutator.remove(genes);
      expect(result).toEqual([1,2,4,5]);

      singletonContext.randomNumberGenerator.stubRandom([3]);
      var result = mutator.remove(genes);
      expect(result).toEqual([1,2,4]);
    });

    describe("when there are no genes", function(){
      beforeEach(function(){
        genes = [];
      });

      it("returns an empty array", function(){
        expect(mutator.remove(genes)).toEqual([]);
      });
    });
  });

  describe("#replace", function() {
    it("changes the value of a random gene", function() {
      spyOn(mutator, 'randomGene').and.returnValue('foo');
      singletonContext.randomNumberGenerator.stubRandom([2]);
      var result = mutator.replace(genes);
      expect(result.length).toEqual(5);
      var indexOfNewGene = result.indexOf('foo');
      expect(indexOfNewGene).not.toEqual(-1);
    });
  });

  describe("#subMutate", function(){
    describe("when the randomly selected gene is an action gene", function(){
      beforeEach(function(){
        genes = [['action', ['reproduce']]];
      });

      it("calls the subMutator on the given gene's action array", function(){
        var mutatedActionArray = ['reproduce','mutated action'];
        spyOn(singletonContext.subMutator, 'mutate').and.returnValue(mutatedActionArray);
        var result = mutator.subMutate(genes);
        expect(singletonContext.subMutator.mutate).toHaveBeenCalledWith(['reproduce']);
        var item = _.find(result, function(gene){
          return (gene[0] == 'action' && gene[1] == mutatedActionArray)
        });

        expect(item).toBeDefined();
      });

      describe('when the action gene has a single action', function(){
        beforeEach(function(){
          genes = [['action', 'reproduce']];
        });

        it("calls the subMutator with the action as an array", function(){
          spyOn(singletonContext.subMutator, 'mutate');
          mutator.subMutate(genes);
          expect(singletonContext.subMutator.mutate).toHaveBeenCalledWith(['reproduce']);
        });
      });
    });

    describe("when the randomly selected gene is a decision node", function(){
      beforeEach(function(){
        genes = [['condition', ['inSpace']]];
      });

      it("does not submutate", function(){
        spyOn(singletonContext.subMutator, 'mutate');
        mutator.subMutate(genes);
        expect(singletonContext.subMutator.mutate).not.toHaveBeenCalled();
      });
    });
  });

  describe("#randomAction", function(){
    it("returns a random action gene", function(){
      singletonContext.randomNumberGenerator.stubRandom([3, 6]);
      expect(mutator.randomAction()).toEqual(['action', 'REPRODUCE']);
      expect(mutator.randomAction()).toEqual(['action', 'DECREMENT_COUNTER']);
    });
  });

  describe("#randomCondition", function(){
    it("returns a random condition gene", function(){ 
      singletonContext.randomNumberGenerator.stubRandom([3, 4]);
      expect(mutator.randomCondition()).toEqual(['condition', 'critterInFront']);
      expect(mutator.randomCondition()).toEqual(['condition', 'critterToTheRight']);
    });
  });
});
