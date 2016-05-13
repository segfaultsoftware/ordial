$(function() {
  WorldView = Backbone.View.extend({
    initialize: function(options) {
      this.cellSize = 20;
      this.graphics = new PIXI.Graphics();

      this.highlightView = options.highlightView ||
        new HighlightView({graphics: this.graphics, cellSize:this.cellSize});

      this.renderer = PIXI.autoDetectRenderer(
        this.model.width * this.cellSize,
        this.model.height * this.cellSize,
        {backgroundColor: 0xCEB89D});

      this.sprites = [];
      var stage = new PIXI.Container();
      stage.addChild(this.graphics);

      var texture = PIXI.utils.TextureCache["emptyTile.png"];
      for(var gridX = 0; gridX < this.model.width; gridX++) {
        this.sprites[gridX] = [];
        for(var gridY = 0; gridY < this.model.height; gridY++) {
          var sprite = new PIXI.Sprite(texture);
          sprite.interactive = true;
          this.sprites[gridX][gridY] = sprite;
          sprite.position.x = gridX * this.cellSize;
          sprite.position.y = gridY * this.cellSize;
          var worldView = this;
          sprite.on('mousedown', (function(gridX, gridY) {
            return function() {
              var thing = worldView.model.getThingAt({x: gridX, y: gridY});
              worldView.model.selectedCritter = thing;
              window.singletonContext.eventBus.trigger('critterSelectedOnMap',
                {
                  critter:thing,
                  location: {gridX:gridX, gridY:gridY}
                });
            };
          })(gridX, gridY));
          stage.addChild(sprite);
        }
      }
      this.stage = stage;
    },

    render: function() {
      this.graphics.clear();
      this.graphics.beginFill(0xFFFFFF, 0.5);
      this.$el.html('');
      for(var gridX = 0; gridX < this.model.width; gridX++) {
        for(var gridY = 0; gridY < this.model.height; gridY++) {
          var thing = this.model.getThingAt({x: gridX, y: gridY});
          var sprite = this.sprites[gridX][gridY];
          var texture;
          if(thing) {
            texture = PIXI.utils.TextureCache[this.imageForModel(thing)];
          } else {
            texture = PIXI.utils.TextureCache["emptyTile.png"];
          }
          sprite.texture = texture;
        }
      }

      this.highlightView.render();
      this.renderer.render(this.stage);

      this.el.appendChild(this.renderer.view);
      return this;
    },

    imageForModel: function(thing) {
      if(thing instanceof Critter) {
        if(thing.isDead()){
          return "ordial_critter_dead.png";
        } else {
          return "ordial_critter_" + thing.direction.toLowerCase() + "_" + thing.color + ".png";
        }
      }
      else if(thing instanceof Resource) {
        return 'resource.png';
      }
      else if(thing instanceof Rock) {
        return 'rock.png';
      }
    }
  });
});
