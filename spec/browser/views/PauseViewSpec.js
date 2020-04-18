var PauseView = require("../../../src/javascript/browser/views/PauseView");

describe("PauseView", () => {
  let pauseView;
  beforeEach(() => {
    pauseView = new PauseView();
  });
  describe("when unpausing", function () {
    beforeEach(function () {
      pauseView.$el.find('#pause-button').click();
    });

    it("should updateWorld", function () {
      expect(ordial.updateWorld).toHaveBeenCalled();
    });

    it('should change text to "pause"', function () {
      expect(pauseView.$el.find('#pause-button').text()).toEqual('pause');
    });
  });

  describe("when pausing", function () {
    beforeEach(function () {
      scheduler.paused = false;
      pauseView.$el.find('#pause-button').click();
    });

    it('should call updateWorld', function () {
      expect(ordial.updateWorld).toHaveBeenCalled();
    });

    it('should change text to "resume"', function () {
      expect(pauseView.$el.find('#pause-button').text()).toEqual('resume');
    });
  });
});