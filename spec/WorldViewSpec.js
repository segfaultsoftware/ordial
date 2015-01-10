describe("WorldView", function() {
  var world, worldView;
  beforeEach(function() {
    world = new World();
    worldView = new WorldView({model: world});
  });

  describe('the grid', function() {
    beforeEach(function() {
     world.height = Math.ceil(Math.random()*100);
     world.width = Math.ceil(Math.random()*100);
     worldView.render();
    });

    it("should have rows matching the world's height", function() {
      expect(worldView.$('tr').length).toEqual(world.height);
    });

    it("should have columns matching the world's width", function () {
      _.each(worldView.$('tr'), function(tr) {
        expect($(tr).find('td').length).toEqual(world.width);
      });
    });
  });

  describe("in a world with Rob", function() {
    var rob;
    beforeEach(function() {
      rob = new Critter();
      rob.direction = CardinalDirection.NORTH;
      world.place(rob, {x: 4, y: 4});

      worldView.render();
    });

    it("should draw Rob at the right place", function() {
      var robsCell = worldView.$el.find("table tr:nth-child(5) td:nth-child(5)");
      expect(robsCell.find('.critter').length).toEqual(1);
    });

    it('should draw nothing everywhere else', function() {
      expect(worldView.$el.find('.critter').length).toEqual(1);
    });

    it('should draw Rob facing the north', function(){
      expect(worldView.$el.find('.critter').hasClass('north')).toBeTruthy();
    });
  });

  describe("in a world with resources", function() {
    beforeEach(function() {
      var resource = new Resource();
      world.place(resource, {x: 3, y: 3});

      worldView.render();
    });

    it("should draw the resource at the right place", function() {
      var resourceCell = worldView.$el.find("table tr:nth-child(4) td:nth-child(4)");
      expect(resourceCell.find(".resource").length).toEqual(1);
    });
  });

  describe("in a world with rocks", function () {
    beforeEach(function () {
      var rock = new Rock();
      world.place(rock, {x: 4, y: 4});

      worldView.render();
    });

    it("should draw the rock at the right place", function () {
      var rockCell = worldView.$el.find("table tr:nth-child(5) td:nth-child(5)");
      expect(rockCell.find(".rock").length).toEqual(1);
    });
  });
});
