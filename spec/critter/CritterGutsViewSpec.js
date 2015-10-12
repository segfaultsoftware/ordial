describe("CritterGutsView", function(){
  var rob, gutsView;
  beforeEach(function(){
    rob = new Critter();
    rob.vitals.mana = 42;
    gutsView = new CritterGutsView();
  });

  describe("when a critter is selected on the map", function(){
    beforeEach(function(){
      window.singletonContext.eventBus.trigger('critterSelectedOnMap', rob);
    });

    it("renders the critter's mana", function(){
      var value = gutsView.$el.find('.critter-mana').text();
      expect(value).toEqual('42');
    });

    describe("when the critter's mana changes", function(){
      it("rendering shows the change", function(){
        rob.vitals.mana = 1234;
        var value = gutsView.render().$el.find('.critter-mana').text();
        expect(value).toEqual("1234");
      });
    });
  });
});
