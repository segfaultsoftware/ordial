describe("CritterView", function() {
  describe("#render", function() {
    var rob, critterView;
    beforeEach(function() {
      rob = new Critter();
      critterView = new CritterView({model: rob});
      critterView.render();
    });


    it('should draw Rob facing the north', function(){
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
});
