describe("TimeoutControlsView", function() {
  var view;
  beforeEach(function() {
    $("#testing-area").html('<div id="TimeoutControlsViewSpec">');
    view = new TimeoutControlsView({el: "#TimeoutControlsViewSpec"});
    view.render();
  });

  describe("when the user moves the slider", function() {
    it("should trigger an event with the value of the slider into a timerange in millis", function() {
      var listenerSpy = jasmine.createSpy('onTimeoutChanged');
      view.on('timeout:changed', listenerSpy);

      view.$el.find('.slider').val(100).trigger('change');
      expect(listenerSpy).toHaveBeenCalledWith({timeout: 0});

      view.$el.find('.slider').val(50).trigger('change');
      expect(listenerSpy).toHaveBeenCalledWith({timeout: 1000});

      view.$el.find('.slider').val(0).trigger('change');
      expect(listenerSpy).toHaveBeenCalledWith({timeout: 2000});

      view.$el.find('.slider').val(80).trigger('change');
      expect(listenerSpy).toHaveBeenCalledWith({timeout: 400});
    });
  });

});
