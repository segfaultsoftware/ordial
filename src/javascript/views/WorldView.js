$(function() {
  WorldView = Backbone.View.extend({
    initialize: function() {
      this.cellSize = 20;
      this.renderer = PIXI.autoDetectRenderer(
        this.model.width * this.cellSize,
        this.model.height * this.cellSize,
        {backgroundColor: 0xCEB89D});
    },

    render: function() {
      var stage = new PIXI.Container();

      this.$el.html('');
      for(var gridY = 0; gridY < this.model.height; gridY++) {
        for(var gridX = 0; gridX < this.model.width; gridX++) {
          var thing = this.model.getThingAt({x: gridX, y: gridY});
          var texture = PIXI.utils.TextureCache[this.imageForModel(thing)];
          var sprite = new PIXI.Sprite(texture);
          sprite.position.x = gridX * this.cellSize;
          sprite.position.y = gridY * this.cellSize;
          sprite.interactive = true;
          sprite.on('mousedown', (function(thing) {
            return function() {
              window.singletonContext.eventBus.trigger('critterSelectedOnMap', thing);
            };
          })(thing));
          stage.addChild(sprite);

        }
      }
      this.renderer.render(stage);
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
