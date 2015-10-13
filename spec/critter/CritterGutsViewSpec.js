describe("CritterGutsView", function(){
  var rob, gutsView;
  beforeEach(function(){
    rob = new Critter({genes:[['condition', 'resourceInFront'], ['action', 'REPRODUCE']]});
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

    it("renders all the critter's genes", function(){
      expect($('.gene').length).toEqual(2);
    });

    describe("when hovering over a gene", function(){
      beforeEach(function(){
        $('.gene')[0].dispatchEvent(new MouseEvent('mouseover'));
      });

      it("displays the full text", function(){
        expect($('.popup').text()).toEqual('condition: resourceInFront')
      });

      describe("and then unhovering", function(){
        beforeEach(function(){
          $('.gene')[0].dispatchEvent(new MouseEvent('mouseout'));
        });

        it("removes the text", function(){
          expect($('.popup')).not.toExist();
        });
      });
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
