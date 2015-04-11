describe("GeneMutator", function(){
  var mutator, genes;
  beforeEach(function(){
    mutator = new GeneMutator();
    genes = [1,2,3,4,5];
    Math.seedrandom(7);
  });

  describe("#mutate", function(){
    it("returns the passed in genes", function(){
      expect(mutator.mutate(genes)).toBe(genes);
    });
    
    describe("selecting a type of mutation", function(){
      var swapResult, insertResult, removeResult;
      beforeEach(function(){
        swapResult = ['swapped'];
        insertResult = ['inserted'];
        removeResult = ['removed'];

        spyOn(mutator, 'swap').and.returnValue(swapResult);
        spyOn(mutator, 'insert').and.returnValue(insertResult);
        spyOn(mutator, 'remove').and.returnValue(removeResult);
      });

      it("can swap", function(){
        Math.seedrandom(1);
        var result = mutator.mutate(genes);
        expect(mutator.swap).toHaveBeenCalledWith(genes);
        expect(result).toBe(swapResult);
      });

      it("can insert", function(){
        Math.seedrandom(2);
        var result = mutator.mutate(genes);
        expect(mutator.insert).toHaveBeenCalledWith(genes);
        expect(result).toBe(insertResult);
      });

      it("can remove", function(){
        Math.seedrandom(3);
        var result = mutator.mutate(genes);
        expect(mutator.remove).toHaveBeenCalledWith(genes);
        expect(result).toBe(removeResult);
      });
    });
  });

  describe("#swap", function(){
    it("randomly swaps a gene into a new location", function(){
      var result = mutator.swap(genes);
      expect(result).toEqual([ 1, 2, 5, 4, 3 ]);

      result = mutator.swap(genes);
      expect(result).toEqual([ 1, 3, 5, 4, 2]);
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
      spyOn(mutator, 'randomAction').and.returnValue(newGene);
      spyOn(mutator, 'randomCondition').and.returnValue(newGene);

      var result = mutator.insert(genes);
      expect(result[4]).toEqual(newGene);

      Math.seedrandom(0);
      result = mutator.insert(genes);
      expect(result[0]).toEqual(newGene);
    });

    it("can insert a random action", function(){
      var actionGene = ['action', 'SOME_ACTION'];
      spyOn(mutator, 'randomAction').and.returnValue(actionGene);
      Math.seedrandom(3);
      var result = mutator.insert(genes);
      expect(result.indexOf(actionGene)).not.toBe(-1);
    });

    it("can insert a random condition", function(){
      var conditionGene = ['condition', 'someCondition'];
      spyOn(mutator, 'randomCondition').and.returnValue(conditionGene);
      Math.seedrandom(1);
      var result = mutator.insert(genes);
      expect(result.indexOf(conditionGene)).not.toBe(-1);
    });
  });

  describe("#remove", function(){
    it("randomly removes a gene", function(){
      var result = mutator.remove(genes);
      expect(result).toEqual([1,2,4,5]);
      var result = mutator.remove(genes);
      expect(result).toEqual([1,2,4]);
    });
  });

  describe("#randomAction", function(){
    it("returns a random action gene", function(){
      expect(mutator.randomAction()).toEqual(['action', 'REPRODUCE']);
      expect(mutator.randomAction()).toEqual(['action', 'DECREMENT_COUNTER']);                  
    });
  });

  describe("#randomCondition", function(){
    it("returns a random condition gene", function(){ 
      Math.seedrandom(1);
      expect(mutator.randomCondition()).toEqual(['condition', 'critterInFront']); expect(mutator.randomCondition()).toEqual(['condition', 'critterToTheRight']);
    });
  });
});