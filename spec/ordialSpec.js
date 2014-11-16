describe("Ordial", function() {
  var ordial, ordialScheduler;

  beforeEach(function() {
    ordialScheduler = jasmine.createSpyObj("fake scheduler", ['schedule']);
    ordial = new Ordial({scheduler: ordialScheduler});
  });

  it("should have a world", function(){
    expect(ordial.world).not.toBeUndefined();
  });

  it("should have a pause button", function() {
    expect(ordial.$el.find("#pause-button")).toBeTruthy();
    expect(ordial.$el.find("#pause-button").text()).toEqual('resume');
  });

  it("should default to paused", function(){
    expect(ordial.paused).toBeTruthy();
  });

  it('should have a seed input field', function() {
    expect(ordial.$el.find('#seed-input')).toBeTruthy();
  });

  describe('seed input field', function() {
    it('should start with a random seed', function() {
      var firstVal = ordial.$el.find('#seed-input').val();
      ordial = new Ordial({scheduler: ordialScheduler});
      ordial.render();
      expect(ordial.$el.find('#seed-input').val()).not.toEqual(firstVal);
    });

    it('should not just use the next call to Math.random as the seed', function(){
      ordial.$el.find('#seed-input').val('abc').blur();
      ordial.$el.find('#pause-button').click();

      ordial = new Ordial({scheduler: ordialScheduler});
      ordial.render();
      ordial.$el.find('#pause-button').click();
      var undefinedRandomVal = Math.random();

      ordial = new Ordial({scheduler: ordialScheduler});
      ordial.render();
      ordial.$el.find('#seed-input').val('abc').blur();
      ordial.$el.find('#pause-button').click();

      ordial = new Ordial({scheduler: ordialScheduler});
      ordial.render();
      ordial.$el.find('#pause-button').click();
      expect(Math.random()).not.toEqual(undefinedRandomVal);
    });

    describe('with different seeds after starting the world', function() {
      var firstVal;
      beforeEach(function() {
        ordial.$el.find('#pause-button').click();
        firstVal = Math.random();
        ordial = new Ordial({scheduler: ordialScheduler});
        ordial.render();
        ordial.$el.find('#pause-button').click();
      });

      it('should lead to different random numbers', function() {
        expect(Math.random()).not.toEqual(firstVal);
      })
    });

    describe('user changing the seed value and after starting the world', function(){
      var firstVal, secondVal;
      beforeEach(function(){
        ordial.$el.find('#seed-input').val('abc').blur();
        ordial.$el.find('#pause-button').click();
        firstVal = Math.random();
        secondVal = Math.random();
        ordial = new Ordial({scheduler: ordialScheduler});
        ordial.render();
        ordial.$el.find('#seed-input').val('abc').blur();
        ordial.$el.find('#pause-button').click();
      });

      it('should produce the same random numbers as previously with the same seed', function(){
        expect(Math.random()).toEqual(firstVal);
        expect(Math.random()).toEqual(secondVal);
      });

      it('should produce different random numbers with a different seed', function(){
        ordial = new Ordial({scheduler: ordialScheduler});
        ordial.render();
        ordial.$el.find('#seed-input').val('abcd').blur();
        ordial.$el.find('#pause-button').click();
        expect(Math.random()).not.toEqual(firstVal);
        expect(Math.random()).not.toEqual(secondVal);
      });
    })
  });

  describe("when the pause button is clicked", function() {
    beforeEach(function() {
      spyOn(ordial, 'updateWorld');
    });

    it('disables the seed input', function() {
      spyOn(ordial.seedView, 'disableInput');
      ordial.$el.find('#pause-button').click();
      expect(ordial.seedView.disableInput).toHaveBeenCalled();
    });

    it("toggles the paused flag", function() {
      expect(ordial.paused).toBeTruthy();
      ordial.$el.find('#pause-button').click();
      expect(ordial.paused).toBeFalsy();
      ordial.$el.find('#pause-button').click();
      expect(ordial.paused).toBeTruthy();
    });

    describe("when unpausing", function(){
      beforeEach(function() {
        ordial.$el.find('#pause-button').click();
      });

      it("should updateWorld", function() {
        expect(ordial.updateWorld).toHaveBeenCalled();
      });
      
      it('should change text to "pause"', function() {
        expect(ordial.$el.find('#pause-button').text()).toEqual('pause');
      });
    });

    describe("when pausing", function() {
      beforeEach(function() {
        ordial.paused = false;
        ordial.$el.find('#pause-button').click();
      });

      it('should call updateWorld', function() {
        expect(ordial.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "resume"', function() {
        expect(ordial.$el.find('#pause-button').text()).toEqual('resume');
      });
    });
  });

  describe("updateWorld", function(){
    describe("when not paused", function() {
      beforeEach(function() {
        ordial.paused = false;
      });

      it("should render the world", function() {
        ordial.updateWorld();
        expect(ordial.$('#world').length).toBe(1);
      });

      it("should update the world", function(){
        spyOn(ordial.world, "update");
        ordial.updateWorld();
        expect(ordial.world.update).toHaveBeenCalled();
      });

      it('should defer an updateWorld for later', function() {
        ordial.updateWorld();
        expect(ordialScheduler.schedule).toHaveBeenCalledWith(ordial);
      });
    });

    describe("when paused", function(){
      beforeEach(function(){
        ordial.paused = true;
      });

      it("should render the world", function() {
        ordial.updateWorld();
        expect(ordial.$('#world').length).toBe(1);
      });

      it("should not update the world", function(){
        ordial.updateWorld();
        spyOn(ordial.world, "update");
        expect(ordial.world.update).not.toHaveBeenCalled();
      });

      it('should not defer an updatedWorld for later', function() {
        ordial.updateWorld();
        expect(ordialScheduler.schedule).not.toHaveBeenCalled();
      });
    })
  });
});
