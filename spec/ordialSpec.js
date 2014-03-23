describe("Ordial", function() {
  beforeEach(function() {
    this.ordial = new Ordial();
    this.ordial.render();
  });

  it("should have a world", function(){
    expect(this.ordial.world).not.toBeUndefined();
  });

  it("should have a pause button", function() {
    expect(this.ordial.$el.find("#pause-button")).toBeTruthy();
    expect(this.ordial.$el.find("#pause-button").text()).toEqual('resume');
  });

  it("should default to paused", function(){
    expect(this.ordial.paused).toBeTruthy();
  });

  it('should have a seed input field', function() {
    expect(this.ordial.$el.find('#seed-input')).toBeTruthy();
  });

  describe('seed input field', function() {
    beforeEach(function() {
      spyOn(_, 'delay').and.callFake(function(){
        console.log('delaaay');
      });
    });

    it('should start with a random seed', function() {
      var firstVal = this.ordial.$el.find('#seed-input').val();
      this.ordial = new Ordial();
      this.ordial.render();
      expect(this.ordial.$el.find('#seed-input').val()).not.toEqual(firstVal);
    });

    it('should not just use the next call to Math.random as the seed', function(){
      this.ordial.$el.find('#seed-input').val('abc').blur();
      this.ordial.$el.find('#pause-button').click();

      this.ordial = new Ordial();
      this.ordial.render();
      this.ordial.$el.find('#pause-button').click();
      var undefinedRandomVal = Math.random();

      this.ordial = new Ordial();
      this.ordial.render();
      this.ordial.$el.find('#seed-input').val('abc').blur();
      this.ordial.$el.find('#pause-button').click();

      this.ordial = new Ordial();
      this.ordial.render();
      this.ordial.$el.find('#pause-button').click();
      expect(Math.random()).not.toEqual(undefinedRandomVal);
    });

    describe('with different seeds after starting the world', function() {
      var firstVal;
      beforeEach(function() {
        this.ordial.$el.find('#pause-button').click();
        firstVal = Math.random();
        this.ordial = new Ordial();
        this.ordial.render();
        this.ordial.$el.find('#pause-button').click();
      });

      it('should lead to different random numbers', function() {
        expect(Math.random()).not.toEqual(firstVal);
      })
    });

    describe('user changing the seed value and after starting the world', function(){
      var firstVal, secondVal;
      beforeEach(function(){
        this.ordial.$el.find('#seed-input').val('abc').blur();
        this.ordial.$el.find('#pause-button').click();
        firstVal = Math.random();
        secondVal = Math.random();
        this.ordial = new Ordial();
        this.ordial.render();
        this.ordial.$el.find('#seed-input').val('abc').blur();
        this.ordial.$el.find('#pause-button').click();
      });

      it('should produce the same random numbers as previously with the same seed', function(){
        expect(Math.random()).toEqual(firstVal);
        expect(Math.random()).toEqual(secondVal);
      });

      it('should produce different random numbers with a different seed', function(){
        this.ordial = new Ordial();
        this.ordial.render();
        this.ordial.$el.find('#seed-input').val('abcd').blur();
        this.ordial.$el.find('#pause-button').click();
        expect(Math.random()).not.toEqual(firstVal);
        expect(Math.random()).not.toEqual(secondVal);
      });
    })
  });

  describe("when the pause button is clicked", function() {
    beforeEach(function() {
      var test = this;
      spyOn(this.ordial, 'updateWorld').and.callFake(function() {
        // we only want to redraw the pause button
        test.ordial.render();
      });
    });

    it('disables the seed input', function() {
      spyOn(this.ordial.seedView, 'disableInput');
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.seedView.disableInput).toHaveBeenCalled();
    });

    it("toggles the paused flag", function() {
      expect(this.ordial.paused).toBeTruthy();
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.paused).toBeFalsy();
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.paused).toBeTruthy();
    });

    describe("when unpausing", function(){
      beforeEach(function() {
        this.ordial.$el.find('#pause-button').click();
      });

      it("should updateWorld", function() {
        expect(this.ordial.updateWorld).toHaveBeenCalled();
      });
      
      it('should change text to "pause"', function() {
        expect(this.ordial.$el.find('#pause-button').text()).toEqual('pause');
      });
    });

    describe("when pausing", function() {
      beforeEach(function() {
        this.ordial.paused = false;
        this.ordial.$el.find('#pause-button').click();
      });

      it('should call updateWorld', function() {
        expect(this.ordial.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "resume"', function() {
        expect(this.ordial.$el.find('#pause-button').text()).toEqual('resume');
      });
    });
  });

  describe("updateWorld", function(){
    beforeEach(function() {
      var test = this;
      this.actuallyCallThrough = false;
      var callCount = 0;
      spyOn(_, 'delay').and.callFake(function(method) {
        if (test.actuallyCallThrough) {
          callCount++;
          if(callCount <= 4){
            method();
          }
        }
      });
    });

    describe("when not paused", function() {
      beforeEach(function() {
        this.ordial.paused = false;
      });

      it("should render the world", function(){
        this.ordial.updateWorld();
        expect(this.ordial.$('#world').length).toBe(1);
      });

      it("should update the world", function(){
        spyOn(this.ordial.world, "update");
        this.ordial.updateWorld();
        expect(this.ordial.world.update).toHaveBeenCalled();
      });

      it('should defer an updateWorld for later', function() {
        this.ordial.updateWorld();
        expect(_.delay).toHaveBeenCalledWith(jasmine.any(Function), 1000);
      });

      describe('the delayed updateWorld', function() {
        it('should delay again', function() {
          this.actuallyCallThrough = true;
          this.ordial.updateWorld();
          expect(_.delay.calls.count()).toEqual(5);
        });
      });
    });

    describe("when paused", function(){
      beforeEach(function(){
        this.ordial.updateWorld();

        this.actuallyCallThrough = true;
        this.ordial.paused = true;
      });

      it("should render the world", function() {
        expect(this.ordial.$('#world').length).toBe(1);
      });

      it("should not update the world", function(){
        spyOn(this.ordial.world, "update");
        expect(this.ordial.world.update).not.toHaveBeenCalled();
      });

      it('should not defer an updatedWorld for later', function() {
        expect(_.delay).not.toHaveBeenCalled();
      });
    })
  });
});