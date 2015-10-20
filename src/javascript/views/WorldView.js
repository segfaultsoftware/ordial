$(function() {
  WorldView = Backbone.View.extend({
    initialize: function() {
      this.cellSize = 20;
      this.renderer = PIXI.autoDetectRenderer(
        this.model.width * this.cellSize,
        this.model.height * this.cellSize,
        {backgroundColor: 0xCEB89D});

      this.sprites = [];

      var stage = new PIXI.Container();
      var texture = PIXI.utils.TextureCache["rock.png"];
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
              window.singletonContext.eventBus.trigger('critterSelectedOnMap', thing);
            };
          })(gridX, gridY));
          stage.addChild(sprite);
        }
      }
      this.stage = stage;
    },

    render: function() {
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
      this.renderer.render(this.stage);
      this.el.appendChild(this.renderer.view);
      return this;
    },

    imageForModel: function(thing) {
      if(thing instanceof Critter) {
        return "ordial_critter_" + thing.direction.toLowerCase() + "_" + thing.color + ".png";
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
