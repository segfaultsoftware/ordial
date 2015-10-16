$(function() {
  TileView = Backbone.View.extend({
    initialize: function(options) {
      this.paper = options.paper;
      this.viewSet = options.viewSet;
      this.viewRect = options.viewRect;
    },
    render: function() {
      this.viewSet.forEach(function(element){
        element.remove();
      });
      //this.viewSet.clear();
      this.paper.setStart();
      //
      //var image = this.selectImage();
      //if(image){
      //  this.paper.rect(image,
      //    this.viewRect.attr('x'),
      //    this.viewRect.attr('y'),
      //    this.viewRect.attr('width'),
      //    this.viewRect.attr('height'));
      //}

      var color = this.selectColor();
      this.viewRect.attr({fill:color});
      var renderSet = this.paper.setFinish();
      renderSet.forEach(_.bind(function(element) {
        this.viewSet.push(element);
      }, this));
      return this;
    },
    selectColor: function(){
      if(this.model) {
        if(this.model instanceof Critter) {
          return '#F00';
        } else if(this.model instanceof Resource) {
          return '#FF0';
        } else if(this.model instanceof Rock) {
          return '#000';
        }
      }
      return '#FFF';
    },

    selectImage: function() {
      if(this.model) {
        if(this.model instanceof Critter) {
          return '/src/assets/critter/ordial_critter_south_pink.png';
        } else if(this.model instanceof Resource) {
          return '/src/assets/resource.png';
        } else if(this.model instanceof Rock) {
          return '/src/assets/rock.png';
        }
      }
    }
  });
});
