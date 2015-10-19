$(function() {
  WorldView = Backbone.View.extend({
    initialize: function(){
      this.cellSize = 15;
      this.renderer = PIXI.autoDetectRenderer(
        this.model.width * this.cellSize,
        this.model.height * this.cellSize,
        {backgroundColor: 0x1099bb});
    },

    render: function() {
      var stage = new PIXI.Container();

      // render the grid
      // render the world inhabitants
      var tableEl = document.createElement('table');
      this.$el.html('');
      for(var row = 0; row < this.model.height; row++) {
        var rowEl = document.createElement('tr');
        for(var col = 0; col < this.model.width; col++){
          var thing = this.model.getThingAt({x: col, y: row});
          var thingView = this.renderThingAt(thing);
          var tdEl = document.createElement('td');
          var texture = PIXI.utils.TextureCache[this.imageForModel(thing)];
          var sprite = new PIXI.Sprite(texture);
          sprite.position.x = col*this.cellSize;
          sprite.position.y = row*this.cellSize;
          sprite.interactive = true;
          sprite.on('mousedown', (function(thing) {
            return function() {
              window.singletonContext.eventBus.trigger('critterSelectedOnMap', thing);
            };
          })(thing));
          stage.addChild(sprite);

          if(thingView){
            tdEl.appendChild(thingView);
          }
          rowEl.appendChild(tdEl);
        }
        tableEl.appendChild(rowEl);
      }
      this.renderer.render(stage);
      this.el.appendChild(this.renderer.view);
      return this;
    },

    imageForModel: function(thing){
      if(thing instanceof Critter){
        return "ordial_critter_" + thing.direction.toLowerCase() + "_" + thing.color + ".png";
      }
      else if (thing instanceof Resource) {
        return 'resource.png';
      }
      else if (thing instanceof Rock) {
        return 'rock.png';
      }
    },
    renderThingAt: function(thing){
      var view;

      if(thing){
        if(thing instanceof Critter){
          view = new CritterView({model: thing});
        }
        else if (thing instanceof Resource) {
          view = new ResourceView();
        }
        else if (thing instanceof Rock) {
          view = new RockView();
        }
      }
      return view ? view.render().el: null;
    }
  });
});
