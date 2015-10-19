describe("WorldView", function() {
  var world, worldView;
  beforeEach(function() {
    world = new World();
    worldView = new WorldView({model: world, el: '#world'});
  });
  describe("initialize", function() {
    it('creates a renderer', function() {
      expect(worldView.renderer).toBeDefined();
    });
  });

  describe("#imageForModel", function() {
    var thing;
    describe("when the thing is a resource", function() {
      beforeEach(function() {
        thing = new Resource();
      });

      it("returns 'resource.png'", function() {
        expect(worldView.imageForModel(thing)).toEqual('resource.png');
      });
    });

    describe("when the thing is a critter", function() {
      beforeEach(function() {
        thing = new Critter();
        thing.color = "lavender"
      });

      describe("directions", function() {
        it('should draw the critter facing the north', function() {
          thing.direction = CardinalDirection.NORTH;
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_north_lavender.png');
        });

        it("should draw the critter facing west", function() {
          thing.direction = CardinalDirection.WEST;
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_west_lavender.png');
        });

        it("should draw the critter facing east", function() {
          thing.direction = CardinalDirection.EAST;
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_east_lavender.png');
        });

        it("should draw the critter facing south", function() {
          thing.direction = CardinalDirection.SOUTH;
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_south_lavender.png');
        });
      });

      describe("colors", function() {
        it("should draw the critter's color", function() {
          thing.color = 'orange';
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_north_orange.png');
        });
      });
    });

    describe("when the thing is a rock", function() {
      beforeEach(function() {
        thing = new Rock();
      });

      it("returns 'rock.png'", function() {
        expect(worldView.imageForModel(thing)).toEqual('rock.png');
      });
    });
  });

  describe('the grid', function() {
    beforeEach(function() {
      world.height = Math.ceil(window.singletonContext.randomNumberGenerator.random() * 100);
      world.width = Math.ceil(window.singletonContext.randomNumberGenerator.random() * 100);
      worldView.render();
    });

    it("should have rows matching the world's height", function() {
      expect(worldView.$('tr').length).toEqual(world.height);
    });

    it("should have columns matching the world's width", function() {
      _.each(worldView.$('tr'), function(tr) {
        expect($(tr).find('td').length).toEqual(world.width);
      });
    });
  });

  describe("in a world with Rob", function() {
    var rob, robLocation;
    beforeEach(function() {
      rob = new Critter();
      rob.direction = CardinalDirection.NORTH;
      world.place(rob, {x: 0, y: 0});
      robLocation = {x: 0 * worldView.cellSize, y: 0 * worldView.cellSize};

      worldView.render();
    });

    it("should draw Rob at the right place", function() {
      var robsCell = worldView.$el.find("table tr:nth-child(5) td:nth-child(5)");
      expect(robsCell.find('.critter').length).toEqual(1);
    });

    it('should draw nothing everywhere else', function() {
      expect(worldView.$el.find('.critter').length).toEqual(1);
    });

    it('should draw Rob facing the north', function() {
      expect(worldView.$el.find('.critter').hasClass('north')).toBeTruthy();
    });

    describe("clicking on the critter", function() {
      var event;
      beforeEach(function(done) {
        var element = $("canvas")[0];
        var rect = element.getBoundingClientRect();

        event = new MouseEvent("mousedown", {
          clientX: rect.left + robLocation.x + 1,
          clientY: rect.top + robLocation.y + 1});

        PIXI.loader.add('/src/assets/spriteSheet/ordialSprites.json')
          .load(_.bind(function(){
            worldView.render();
            done();
          }, this));
      });

      it("should trigger a global critterSelectedOnMap event with the critter model", function() {
        var callbackSpy = jasmine.createSpy();
        singletonContext.eventBus.bind('critterSelectedOnMap', callbackSpy);
        var canvasElement = document.getElementsByTagName("canvas")[0];
        canvasElement.dispatchEvent(event);

        expect(callbackSpy).toHaveBeenCalledWith(rob);
      });
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

  describe("in a world with rocks", function() {
    beforeEach(function() {
      var rock = new Rock();
      world.place(rock, {x: 4, y: 4});

      worldView.render();
    });

    it("should draw the rock at the right place", function() {
      var rockCell = worldView.$el.find("table tr:nth-child(5) td:nth-child(5)");
      expect(rockCell.find(".rock").length).toEqual(1);
    });
  });
});
