describe("CritterManaView", function(){
  var rob, manaView;
  beforeEach(function(){
    rob = new Critter();
    rob.vitals.mana = 42;
    manaView = new CritterManaView();
  });

  describe("when a critter is selected on the map", function(){
    beforeEach(function(){
      window.singletonContext.eventBus.trigger('critterSelectedOnMap', rob);
    });

    it("renders the critter's mana", function(){
      var value = manaView.$el.find('.critter-mana').text();
      expect(value).toEqual('42');
    });

    describe("when the critter's mana changes", function(){
      it("rendering shows the change", function(){
        rob.vitals.mana = 1234;
        var value = manaView.render().$el.find('.critter-mana').text();
        expect(value).toEqual("1234");
      });
    });
  });
});