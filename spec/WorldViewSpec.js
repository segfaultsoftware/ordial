describe("WorldView", function() {
  beforeEach(function() {
    this.world = new World();
    this.worldView = new WorldView({model: this.world});
  });

  describe('the grid', function() {
    beforeEach(function() {
      this.worldView.render();
    });

    it('should have 10 rows', function() {
      expect(this.worldView.$('tr').length).toEqual(10);
    });

    it('should have 10 columns per row', function () {
      _.each(this.worldView.$('tr'), function(tr) {
        expect($(tr).find('td').length).toEqual(10);
      });
    });
  });

  describe("in a world with Rob", function() {
    var rob;
    beforeEach(function() {
      rob = new Critter();
      this.world.place(rob, 4, 4);

      this.worldView.render();
    });

    it("should draw Rob at the right place", function() {
      var robsCell = this.worldView.$el.find("table tr:nth-child(5) td:nth-child(5)");
      expect(robsCell.find('.critter').length).toEqual(1);
    });

    it('should draw nothing everywhere else', function() {
      expect(this.worldView.$el.find('.critter').length).toEqual(1);
    });

    it('should draw Rob facing the north', function(){
      expect(this.worldView.$el.find('.critter').hasClass('north')).toBeTruthy();
    });

    describe("rob facing other directions", function(){
      it("should draw Rob facing west", function(){
        rob.direction = CardinalDirection.WEST;
        this.worldView.render();
        expect(this.worldView.$el.find('.critter').hasClass('west')).toBeTruthy();
        expect(this.worldView.$el.find('.critter').hasClass('north')).toBeFalsy();
      });

      it("should draw Rob facing east", function(){
        rob.direction = CardinalDirection.EAST;
        this.worldView.render();
        expect(this.worldView.$el.find('.critter').hasClass('east')).toBeTruthy();
      });

      it("should draw Rob facing south", function(){
        rob.direction = CardinalDirection.SOUTH;
        this.worldView.render();
        expect(this.worldView.$el.find('.critter').hasClass('south')).toBeTruthy();
      });
    });
  });
});
