describe("Seed", function() {
  var seed;
  it('should default isFinalized to false', function() {
    seed = new Seed();
    expect(seed.get('isFinalized')).toBe(false);
  });

  it('should default seedValue to a random number', function() {
    seed = new Seed();
    var otherSeed = new Seed();
    expect(seed.get('seedValue')).not.toBe(otherSeed.get('seedValue'));
  });

  it('should set the seedValue if passed in', function() {
    seed = new Seed({seedValue: 'foo'});
    expect(seed.get('seedValue')).toBe('foo');
  });

  describe('#seedRandom', function(){
    var seedValue;
    beforeEach(function(){
      seedValue = 'wertq';
      seed = new Seed();
      seed.set('seedValue', seedValue);
      spyOn(singletonContext.randomNumberGenerator, "seedrandom");
    });

    it('should call Math.seedrandom with the seed value', function(){
      seed.seedRandom();
      expect(singletonContext.randomNumberGenerator.seedrandom).toHaveBeenCalledWith(seedValue);
    });
  });
});
