describe("CritterView", function() {
  describe("#render", function() {
    var rob, critterView;
    beforeEach(function() {
      rob = new Critter();
      critterView = new CritterView({model: rob});
    });

    describe("directions", function () {
      it('should draw Rob facing the north', function(){
        rob.direction = CardinalDirection.NORTH;
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('north')).toBeTruthy();
      });

      it("should draw Rob facing west", function(){
        rob.direction = CardinalDirection.WEST;
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('west')).toBeTruthy();
        expect(critterView.$el.find('.critter').hasClass('north')).toBeFalsy();
      });

      it("should draw Rob facing east", function(){
        rob.direction = CardinalDirection.EAST;
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('east')).toBeTruthy();
      });

      it("should draw Rob facing south", function(){
        rob.direction = CardinalDirection.SOUTH;
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('south')).toBeTruthy();
      });
    });

    describe("colors", function () {
      it("should draw Rob's color", function () {
        rob.color = 'lavender';
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('lavender')).toBeTruthy();

        rob.color = 'orange';
        critterView.render();
        expect(critterView.$el.find('.critter').hasClass('lavender')).toBeFalsy();
        expect(critterView.$el.find('.critter').hasClass('orange')).toBeTruthy();
      });
    });
  });
});
