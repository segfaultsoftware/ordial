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
      rob.direction = CardinalDirection.NORTH;
      this.world.place(rob, {x: 4, y: 4});

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
  });

  describe("in a world with resources", function() {
    var resource;
    beforeEach(function() {
      resource = new Resource();
      this.world.place(resource, {x: 3, y: 3});

      this.worldView.render();
    });

    it("should draw the resource at the right place", function() {
      var resourceCell = this.worldView.$el.find("table tr:nth-child(4) td:nth-child(4)");
      expect(resourceCell.find(".resource").length).toEqual(1);
    });
  });
});
