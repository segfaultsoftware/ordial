var CritterGutsView = require("../../src/javascript/browser/views/CritterGutsView");

describe("CritterGutsView", function() {
  var rob, gutsView;
  beforeEach(function() {
    rob = new Critter({genes: [['condition', 'resourceInFront'], ['action', 'REPRODUCE']]});
    rob.vitals.mana = 42;
    gutsView = new CritterGutsView();
  });

  describe("#filter", function(){
    describe("when configuration.hideJunkDna is true", function(){
      var genes;
      beforeEach(function(){
        singletonContext.configuration.hideJunkDna = true;
        genes = [
          ['condition', 'resourceToTheRight'],
          ['action', 'REPRODUCE'],
          ['condition', 'resourceToTheRight'],
          ['condition', 'SOME_JUNK'],
          ['action', 'MORE_JUNK'],
          ['action', 'NOT_JUNK']
        ];
      });

      it("replaces junk dna nodes with null and returns the result", function(){
        var result = gutsView.filter(genes);
        expect(result[3]).toBeNull();
        expect(result[4]).toBeNull();
        expect(result[5]).toEqual(['action', 'NOT_JUNK']);
      });

      it("does not alter the passed in array", function(){
        gutsView.filter(genes);
        expect(genes[3]).not.toBeNull();
        expect(genes[4]).not.toBeNull();
      });

      describe("when there is a row of only junk dna", function(){
        beforeEach(function(){
          genes = [
            ['action', 'MOVE_FORWARD'],
            ['action', 'REPRODUCE'],
            ['condition', 'resourceToTheRight']
          ];
        });

        it("removes those positions from the array", function(){
          var result = gutsView.filter(genes);
          expect(result).toEqual([['action', 'MOVE_FORWARD']]);
        });
      });
    });
  });

  describe('when no critter is selected', function() {
    it("renders a message about no critter being selected", function() {
      var value = gutsView.render().$el.find('.critter-guts .message').text();
      expect(value).toEqual('(no critter selected)');
    });
  });

  describe("when a critter is selected on the map", function() {
    beforeEach(function() {
      singletonContext.eventBus.trigger('critterSelectedOnMap', {critter: rob, location: null});
    });

    it("renders the critter's mana", function() {
      var value = gutsView.$el.find('.critter-mana').text();
      expect(value).toEqual('42');
    });

    it("renders all the critter's genes", function() {
      expect($('.gene').length).toEqual(2);
    });

    describe("when hovering over a gene", function() {
      beforeEach(function() {
        $('.gene')[0].dispatchEvent(new MouseEvent('mouseover'));
      });

      it("displays the full text", function() {
        expect($('.popup').text()).toEqual('"resourceInFront"');
      });

      describe("and then unhovering", function() {
        beforeEach(function() {
          $('.gene')[0].dispatchEvent(new MouseEvent('mouseout'));
        });

        it("removes the text", function() {
          expect($('.popup')).not.toExist();
        });
      });
    });

    describe("when the critter's mana changes", function() {
      it("rendering shows the change", function() {
        rob.vitals.mana = 1234;
        var value = gutsView.render().$el.find('.critter-mana').text();
        expect(value).toEqual("1234");
      });
    });

    describe("and then deselected", function() {
      beforeEach(function() {
        singletonContext.eventBus.trigger('critterSelectedOnMap', {critter:null, location:null});
      });

      it("renders a message about no critter being selected", function() {
        var value = gutsView.render().$el.find('.critter-guts .message').text();
        expect(value).toEqual('(no critter selected)');
      });
    });
  });

  describe("hide junk dna checkbox", function(){
    var checkbox;
    beforeEach(function(){
      checkbox = gutsView.render().$el.find('.critter-guts input[type=checkbox]#hide-junk-dna-checkbox');
    });

    it("a hide junk dna checkbox is visible", function() {
      expect(checkbox).toExist();
    });

    describe("when the config value for hideJunkDna is true", function() {
      beforeEach(function(){
        singletonContext.configuration.hideJunkDna = true;
      });

      it("is checked", function(){
        checkbox = gutsView.render().$el.find('.critter-guts input[type=checkbox]#hide-junk-dna-checkbox');
        expect(checkbox).toBeChecked();
      });

      describe("when the hide junk dna button is clicked", function(){
        it("sets the configuration.hideJunkDna false", function(){
          checkbox.trigger('click');
          expect(singletonContext.configuration.hideJunkDna).toBeFalsy();
        });

        it("rerenders the dendrogram", function(){
          spyOn(gutsView, 'renderDendrogram');
          checkbox.trigger('click');
          expect(gutsView.renderDendrogram).toHaveBeenCalled();
        });
      });
    });

    describe("when the config value for hideJunk is false", function(){
      beforeEach(function(){
        singletonContext.configuration.hideJunkDna = false;
      });

      it("is not checked", function(){
        checkbox = gutsView.render().$el.find('.critter-guts input[type=checkbox]#hide-junk-dna-checkbox');
        expect(checkbox).not.toBeChecked();
      });

      describe("when the hide junk dna button is clicked", function(){
        var checkbox;
        beforeEach(function(){
          checkbox = gutsView.render().$el.find('.critter-guts input[type=checkbox]#hide-junk-dna-checkbox')
        });

        it("sets the configuration.hideJunkDna true", function(){
          checkbox.trigger('click');
          expect(singletonContext.configuration.hideJunkDna).toBeTruthy();
        });

        it("rerenders the dendrogram", function(){
          spyOn(gutsView, 'renderDendrogram');
          checkbox.trigger('click');
          expect(gutsView.renderDendrogram).toHaveBeenCalled();
        });
      });
    });
  });
});
