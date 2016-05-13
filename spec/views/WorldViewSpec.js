PIXI_LOADED_SHEET = false;
describe("WorldView", function() {
  var world, worldView;
  beforeEach(function(done) {
    world = new World();
    if(!PIXI_LOADED_SHEET) {
      PIXI.loader.add('/src/assets/spriteSheet/ordialSprites.json')
        .load(_.bind(function() {
          worldView = new WorldView({model: world, el: '#world'});
          done();
        }));
    } else {
      worldView = new WorldView({model: world, el: '#world'});
      done();
    }
    PIXI_LOADED_SHEET = true;
  });

  describe("initialize", function() {
    it('creates a renderer', function() {
      expect(worldView.renderer).toBeDefined();
    });

    describe('the grid', function() {
      beforeEach(function() {
        world.height = Math.ceil(window.singletonContext.randomNumberGenerator.random() * 100);
        world.width = Math.ceil(window.singletonContext.randomNumberGenerator.random() * 100);
        worldView = new WorldView({model: world, el: '#world'});
        worldView.render();
      });

      it("should have height matching the world's height", function() {
        var element = $("canvas")[0];
        var rect = element.getBoundingClientRect();
        expect(rect.height).toEqual(world.height * worldView.cellSize);
      });

      it("should have width matching the world's width", function() {
        var element = $("canvas")[0];
        var rect = element.getBoundingClientRect();
        expect(rect.width).toEqual(world.width * worldView.cellSize);
      });
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

      describe("dead critters", function(){
        it("is drawn as dead", function(){
          thing.vitals.mana = -1;
          expect(worldView.imageForModel(thing)).toEqual('ordial_critter_dead.png');
        });
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

  describe("#render", function(){
    var highlightView;
    beforeEach(function(){
      highlightView = new HighlightView({});
      worldView = new WorldView({model: world, el: '#world', highlightView: highlightView});
      spyOn(highlightView, 'render');
    });

    it("renders the highlight view", function(){
      worldView.render();
      expect(highlightView.render).toHaveBeenCalled();
    });
  });

  describe("in a world with Rob", function() {
    var rob, robLocation;
    beforeEach(function() {
      rob = new Critter();
      rob.direction = CardinalDirection.NORTH;
      world.place(rob, {x: 0, y: 0});
      robLocation = {x: 0.5 * worldView.cellSize, y: 0.5 * worldView.cellSize};
      worldView.render();
    });

    describe("clicking on the critter", function() {
      var event;
      beforeEach(function() {
        var element = $("canvas")[0];
        var rect = element.getBoundingClientRect();

        event = new MouseEvent("mousedown", {
          clientX: rect.left + robLocation.x,
          clientY: rect.top + robLocation.y
        });

        worldView.render();
      });

      it("should trigger a global critterSelectedOnMap event with the critter model", function() {
        var callbackSpy = jasmine.createSpy();
        singletonContext.eventBus.bind('critterSelectedOnMap', callbackSpy);
        var canvasElement = document.getElementsByTagName("canvas")[0];
        canvasElement.dispatchEvent(event);

        expect(callbackSpy).toHaveBeenCalledWith({critter:rob, location:{gridX:0, gridY:0}});
      });

      it("sets the selected critter on the world model", function(){
        var canvasElement = document.getElementsByTagName("canvas")[0];
        canvasElement.dispatchEvent(event);
        expect(world.selectedCritter).toBe(rob);
      });
    });
  });
});
