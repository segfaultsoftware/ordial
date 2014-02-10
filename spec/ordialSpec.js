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

  describe("when the pause button is clicked", function() {
    beforeEach(function() {
      var test = this;
      spyOn(this.ordial, 'updateWorld').and.callFake(function() {
        // we only want to redraw the pause button
        test.ordial.render();
      });
    });

    it("toggles the paused flag", function() {
      expect(this.ordial.paused).toBeTruthy();
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.paused).toBeFalsy();
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.paused).toBeTruthy();
    });

    it("toggles the pause button's text");

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