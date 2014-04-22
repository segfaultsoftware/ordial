describe("ControlView", function() {
  var controlView, world;
  beforeEach(function() {
    world = new World();
    controlView = new ControlView({world: world});
  });

  it("should have a pause button", function() {
    expect(controlView.$el.find("#pause-button")).toBeTruthy();
    expect(controlView.$el.find("#pause-button").text()).toEqual('resume');
  });

  it("should default to paused", function(){
    expect(controlView.paused).toBeTruthy();
  });

  it('should have a seed input field', function() {
    expect(controlView.$el.find('#seed-input')).toBeTruthy();
  });

  describe('seed input field', function() {
    beforeEach(function() {
      spyOn(_, 'delay').and.callFake(function(){
        console.log('delaaay');
      });
    });

    it('should start with a random seed', function() {
      var firstVal = controlView.$el.find('#seed-input').val();
      controlView = new Ordial();
      controlView.render();
      expect(controlView.$el.find('#seed-input').val()).not.toEqual(firstVal);
    });

    it('should not just use the next call to Math.random as the seed', function(){
      controlView.$el.find('#seed-input').val('abc').blur();
      controlView.$el.find('#pause-button').click();

      controlView = new Ordial();
      controlView.render();
      controlView.$el.find('#pause-button').click();
      var undefinedRandomVal = Math.random();

      controlView = new Ordial();
      controlView.render();
      controlView.$el.find('#seed-input').val('abc').blur();
      controlView.$el.find('#pause-button').click();

      controlView = new Ordial();
      controlView.render();
      controlView.$el.find('#pause-button').click();
      expect(Math.random()).not.toEqual(undefinedRandomVal);
    });

    describe('with different seeds after starting the world', function() {
      var firstVal;
      beforeEach(function() {
        controlView.$el.find('#pause-button').click();
        firstVal = Math.random();
        controlView.render();
        controlView.$el.find('#pause-button').click();
      });

      it('should lead to different random numbers', function() {
        expect(Math.random()).not.toEqual(firstVal);
      })
    });

    describe('user changing the seed value and after starting the world', function(){
      var firstVal, secondVal;
      beforeEach(function(){
        controlView.$el.find('#seed-input').val('abc').blur();
        controlView.$el.find('#pause-button').click();
        firstVal = Math.random();
        secondVal = Math.random();
        controlView = new Ordial();
        controlView.render();
        controlView.$el.find('#seed-input').val('abc').blur();
        controlView.$el.find('#pause-button').click();
      });

      it('should produce the same random numbers as previously with the same seed', function(){
        expect(Math.random()).toEqual(firstVal);
        expect(Math.random()).toEqual(secondVal);
      });

      it('should produce different random numbers with a different seed', function(){
        controlView = new Ordial();
        controlView.render();
        controlView.$el.find('#seed-input').val('abcd').blur();
        controlView.$el.find('#pause-button').click();
        expect(Math.random()).not.toEqual(firstVal);
        expect(Math.random()).not.toEqual(secondVal);
      });
    })
  });

  describe("when the pause button is clicked", function() {
    beforeEach(function() {
      var test = this;
      spyOn(controlView, 'updateWorld').and.callFake(function() {
        // we only want to redraw the pause button
        test.ordial.render();
      });
    });

    it('disables the seed input', function() {
      spyOn(controlView.seedView, 'disableInput');
      controlView.$el.find('#pause-button').click();
      expect(controlView.seedView.disableInput).toHaveBeenCalled();
    });

    it("toggles the paused flag", function() {
      expect(controlView.paused).toBeTruthy();
      controlView.$el.find('#pause-button').click();
      expect(controlView.paused).toBeFalsy();
      controlView.$el.find('#pause-button').click();
      expect(controlView.paused).toBeTruthy();
    });

    describe("when unpausing", function(){
      beforeEach(function() {
        controlView.$el.find('#pause-button').click();
      });

      it("should updateWorld", function() {
        expect(controlView.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "pause"', function() {
        expect(controlView.$el.find('#pause-button').text()).toEqual('pause');
      });
    });

    describe("when pausing", function() {
      beforeEach(function() {
        controlView.paused = false;
        controlView.$el.find('#pause-button').click();
      });

      it('should call updateWorld', function() {
        expect(controlView.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "resume"', function() {
        expect(controlView.$el.find('#pause-button').text()).toEqual('resume');
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
        controlView.paused = false;
      });

      it("should render the world", function(){
        controlView.updateWorld();
        expect(controlView.$('#world').length).toBe(1);
      });

      it("should update the world", function(){
        spyOn(controlView.world, "update");
        controlView.updateWorld();
        expect(controlView.world.update).toHaveBeenCalled();
      });

      it('should defer an updateWorld for later', function() {
        controlView.updateWorld();
        expect(_.delay).toHaveBeenCalledWith(jasmine.any(Function), 1000);
      });

      describe('the delayed updateWorld', function() {
        it('should delay again', function() {
          this.actuallyCallThrough = true;
          controlView.updateWorld();
          expect(_.delay.calls.count()).toEqual(5);
        });
      });
    });

    describe("when paused", function(){
      beforeEach(function(){
        controlView.updateWorld();

        this.actuallyCallThrough = true;
        controlView.paused = true;
      });

      it("should render the world", function() {
        expect(controlView.$('#world').length).toBe(1);
      });

      it("should not update the world", function(){
        spyOn(controlView.world, "update");
        expect(controlView.world.update).not.toHaveBeenCalled();
      });

      it('should not defer an updatedWorld for later', function() {
        expect(_.delay).not.toHaveBeenCalled();
      });
    })
  });

});
