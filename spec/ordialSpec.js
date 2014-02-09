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
  });

  describe("when the pause button is clicked", function() {
    it("toggles the paused flag", function() {
      expect(this.ordial.paused).toBeFalsy();
      this.ordial.$el.find('#pause-button').click();
      expect(this.ordial.paused).toBeTruthy();
    });

    describe("when unpausing", function(){
      it("should updateWorld", function() {
        this.ordial.paused = true;
        spyOn(this.ordial, 'updateWorld');
        this.ordial.$el.find('#pause-button').click();
        expect(this.ordial.updateWorld).toHaveBeenCalled();
      });
    })
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

    describe("when paused", function(){
      beforeEach(function(){
        this.ordial.paused = true;
      });

      it("should render the world", function() {
        this.ordial.updateWorld();
        expect(this.ordial.$('#world').length).toBe(1);
      });

      it("should not update the world", function(){
        spyOn(this.ordial.world, "update");
        this.ordial.updateWorld();
        expect(this.ordial.world.update).not.toHaveBeenCalled();
      });

      it('should not defer an updatedWorld for later', function() {
        this.ordial.updateWorld();
        expect(_.delay).not.toHaveBeenCalled();
      });
    })
  });
});