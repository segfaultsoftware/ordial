describe("CritterGutsView", function(){
  var rob, gutsView;
  beforeEach(function(){
    rob = new Critter({genes:[['condition', 'resourceInFront']]});
    rob.vitals.mana = 42;
    gutsView = new CritterGutsView();
  });

  describe('when no critter is selected', function(){
    it("renders a message about no critter being selected", function(){
      var value = gutsView.render().$el.find('.critter-guts .message').text();
      expect(value).toEqual('(no critter selected)');
    });
  });

  describe("when a critter is selected on the map", function(){
    beforeEach(function(){
      window.singletonContext.eventBus.trigger('critterSelectedOnMap', rob);
    });

    it("renders the critter's mana", function(){
      var value = gutsView.$el.find('.critter-mana').text();
      expect(value).toEqual('42');
    });

    it("renders the critter's genes", function(){
      var value = gutsView.$el.find('.critter-genes').text();

      expect(value).toMatch('.*condition.*resourceInFront');
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
