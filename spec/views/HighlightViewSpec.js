describe("HighlightView", function() {
  var highlightView, graphics;
  beforeEach(function() {
    graphics = new PIXI.Graphics();
    highlightView = new HighlightView({graphics: graphics, cellSize: 20});
  });

  describe("#render", function() {
    describe("when a critter is selected", function(){
      beforeEach(function(){
        spyOn(graphics, 'drawRect');

        window.singletonContext.eventBus.trigger('critterSelectedOnMap',
          {critter: null, location: {gridX: 123, gridY: 10}});
      });

      it('renders a highlight around the triggered square', function() {
        highlightView.render();
        expect(graphics.drawRect).toHaveBeenCalledWith(123*20, 10*20, 20, 20);
      });
    });

    describe("when the selected critter moves", function(){
      beforeEach(function() {
        spyOn(graphics, 'drawRect');

        window.singletonContext.eventBus.trigger('selectedCritterMoved',
          {critter: null, location: {gridX: 124, gridY: 400}});
      });

      it('renders a highlight around the triggered square', function() {
        highlightView.render();
        expect(graphics.drawRect).toHaveBeenCalledWith(124*20, 400*20, 20, 20);
      });
    });

    describe("when no critter has been selected", function(){
      it("renders nothing", function(){
        spyOn(graphics, 'drawRect');

        highlightView.render();
        expect(graphics.drawRect).not.toHaveBeenCalled();
      })
    });
  });
});
