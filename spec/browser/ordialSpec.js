var WorldView = require("../../src/javascript/browser/views/WorldView");
var World = require("../../src/javascript/lib/World");
var Ordial = require("../../src/javascript/browser/ordial");
var $ = require('jquery');

describe("Ordial", function () {
  var ordial, ordialScheduler, loaderPromise;

  beforeEach(function () {
    singletonContext.scheduler = jasmine.createSpyObj("fake scheduler", ['schedule']);
    singletonContext.world = new World();

    loaderPromise = jasmine.createSpyObj('loaderPromise', ["load"]);
    spyOn(PIXI.loader, "add").and.returnValue(loaderPromise);
    ordial = new Ordial();
  });

  describe("loading images", function () {
    it("loads images from a spritesheet", function () {
      expect(PIXI.loader.add).toHaveBeenCalledWith('/assets/spriteSheet/ordialSprites.json');
    });

    describe("after the images are loaded", function () {
      var loadCallback;
      beforeEach(function () {
        spyOn(WorldView.prototype, 'render');
        loaderPromise.load.and.callFake(function (callback) {
          loadCallback = callback;
        });
      });

      it("renders the worldView", function () {
        ordial = new Ordial();
        WorldView.prototype.render.calls.reset();
        loadCallback();
        expect(WorldView.prototype.render).toHaveBeenCalled();
      });
    });
  });

  it("should have a pause button", function () {
    expect(ordial.$el.find("#pause-button")).toBeTruthy();
    expect($(ordial.$el.find('#pause-button').selector).text()).toEqual('resume');
  });

  it("should default to paused", function () {
    expect(ordial.paused).toBeTruthy();
  });

  it('should have a seed input field', function () {
    expect(ordial.$el.find('#seed-input')).toBeTruthy();
  });

  describe('seed input field', function () {
    it('should start with a random seed', function () {
      var firstVal = ordial.$el.find('#seed-input').val();
      ordial = new Ordial({ scheduler: ordialScheduler });
      ordial.render();
      expect($(ordial.$el.find('#seed-input').selector).val()).not.toEqual(firstVal);
    });

    it('should not just use the next call to Math.random as the seed', function () {
      ordial.$el.find('#seed-input').val('abc').blur();
      ordial.$el.find('#pause-button').click();

      ordial = new Ordial({ scheduler: ordialScheduler });
      ordial.render();
      ordial.$el.find('#pause-button').click();
      var undefinedRandomVal = singletonContext.randomNumberGenerator.random(1000000);

      ordial = new Ordial({ scheduler: ordialScheduler });
      ordial.render();
      ordial.$el.find('#seed-input').val('abc').blur();
      ordial.$el.find('#pause-button').click();

      ordial = new Ordial({ scheduler: ordialScheduler });
      ordial.render();
      ordial.$el.find('#pause-button').click();
      expect(singletonContext.randomNumberGenerator.random(1000000)).not.toEqual(undefinedRandomVal);
    });

    describe('with different seeds after starting the world', function () {
      var firstVal;
      beforeEach(function () {
        ordial.$el.find('#pause-button').click();
        firstVal = singletonContext.randomNumberGenerator.random(1000000);
        ordial = new Ordial({ scheduler: ordialScheduler });
        ordial.render();
        ordial.$el.find('#pause-button').click();
      });

      it('should lead to different random numbers', function () {
        expect(singletonContext.randomNumberGenerator.random(1000000)).not.toEqual(firstVal);
      })
    });

    describe('user changing the seed value and after starting the world', function () {
      var firstVal, secondVal;
      beforeEach(function () {
        ordial.$el.find('#seed-input').val('abc').blur();
        ordial.$el.find('#pause-button').click();
        firstVal = singletonContext.randomNumberGenerator.random(1000000);
        secondVal = singletonContext.randomNumberGenerator.random(1000000);
        ordial = new Ordial({ scheduler: ordialScheduler });
        ordial.render();
        ordial.$el.find('#seed-input').val('abc').blur();
        ordial.$el.find('#pause-button').click();
      });

      it('should produce the same random numbers as previously with the same seed', function () {
        expect(singletonContext.randomNumberGenerator.random(1000000)).toEqual(firstVal);
        expect(singletonContext.randomNumberGenerator.random(1000000)).toEqual(secondVal);
      });

      it('should produce different random numbers with a different seed', function () {
        ordial = new Ordial({ scheduler: ordialScheduler });
        ordial.render();
        ordial.$el.find('#seed-input').val('abcd').blur();
        ordial.$el.find('#pause-button').click();
        expect(singletonContext.randomNumberGenerator.random(1000000)).not.toEqual(firstVal);
        expect(singletonContext.randomNumberGenerator.random(1000000)).not.toEqual(secondVal);
      });
    })
  });

  describe("when the pause button is clicked", function () {
    beforeEach(function () {
      spyOn(ordial, 'updateWorld');
    });

    it('disables the seed input', function () {
      spyOn(ordial.seedView, 'disableInput');
      ordial.$el.find('#pause-button').click();
      expect(ordial.seedView.disableInput).toHaveBeenCalled();
    });

    it("toggles the paused flag", function () {
      expect(ordial.paused).toBeTruthy();
      ordial.$el.find('#pause-button').click();
      expect(ordial.paused).toBeFalsy();
      ordial.$el.find('#pause-button').click();
      expect(ordial.paused).toBeTruthy();
    });

    describe("when unpausing", function () {
      beforeEach(function () {
        ordial.$el.find('#pause-button').click();
      });

      it("should updateWorld", function () {
        expect(ordial.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "pause"', function () {
        expect($(ordial.$el.find('#pause-button').selector).text()).toEqual('pause');
      });
    });

    describe("when pausing", function () {
      beforeEach(function () {
        ordial.paused = false;
        ordial.$el.find('#pause-button').click();
      });

      it('should call updateWorld', function () {
        expect(ordial.updateWorld).toHaveBeenCalled();
      });

      it('should change text to "resume"', function () {
        expect(ordial.$el.find('#pause-button').text()).toEqual('resume');
      });
    });
  });

  describe("updateWorld", function () {
    describe("when not paused", function () {
      beforeEach(function () {
        ordial.paused = false;
      });

      it("should render the world", function () {
        ordial.updateWorld();
        expect(ordial.$('#world').length).toBe(1);
      });

      it("should update the world", function () {
        spyOn(singletonContext.world, "update");
        ordial.updateWorld();
        expect(singletonContext.world.update).toHaveBeenCalled();
      });

      it('should defer an updateWorld for later', function () {
        ordial.updateWorld();
        expect(singletonContext.scheduler.schedule).toHaveBeenCalledWith(ordial);
      });
    });

    describe("when paused", function () {
      beforeEach(function () {
        ordial.paused = true;
      });

      it("should render the world", function () {
        ordial.updateWorld();
        expect(ordial.$('#world').length).toBe(1);
      });

      it("should not update the world", function () {
        spyOn(singletonContext.world, "update");
        ordial.updateWorld();
        expect(singletonContext.world.update).not.toHaveBeenCalled();
      });

      it('should not defer an updatedWorld for later', function () {
        ordial.updateWorld();
        expect(singletonContext.scheduler.schedule).not.toHaveBeenCalled();
      });
    })
  });

  describe("the scheduler", function () {
    it("should be controllable by slider", function () {
      // its only undefined because we have it as a spyObj; it should default to 1000
      expect(singletonContext.scheduler.timeout).toBeUndefined();
      ordial.timeoutControlsView.trigger("timeout:changed", { timeout: 200 });
      expect(singletonContext.scheduler.timeout).toEqual(200);
    });
  });
});
