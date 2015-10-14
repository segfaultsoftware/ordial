$(function () {
  CritterGutsView = Backbone.View.extend({
    initialize: function () {
      this.model = {};
      window.singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
    },
    setCritter: function (critter) {
      this.model = critter;
      this.render();
    },

    template: function () {
      return JST['src/templates/critterGuts.template.html'](this.model);
    },

    renderDendrogram: function(){
      this.prevModel = this.model;
      var genes = this.model.genes;
      var graph = Snap('#mind-graph').attr({width: 0, height: 0});
      graph.clear();

      if (genes) {
        var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes, 25);
        graph.attr({width: binaryTreeGraphHelper.getWidth(), height: binaryTreeGraphHelper.getHeight()});

        _.each(genes, function renderLines(gene, index) {
          var coords = binaryTreeGraphHelper.getCoords(index);

          if (binaryTreeGraphHelper.hasLeftChild(index)) {
            var leftChildCoords = binaryTreeGraphHelper.getLeftChildCoords(index);
            graph.line(
              coords.x, coords.y,
              leftChildCoords.x,
              leftChildCoords.y);
          }

          if (binaryTreeGraphHelper.hasRightChild(index)) {
            var rightChildCoords = binaryTreeGraphHelper.getRightChildCoords(index);
            graph.line(
              coords.x,
              coords.y,
              rightChildCoords.x,
              rightChildCoords.y);
          }
        });

        _.each(genes, function renderImage(gene, index) {
          if (gene) {
            var coords = binaryTreeGraphHelper.getCoords(index);

            var hoverText;
            var imageSize = 25;
            var circle = graph.circle(coords.x, coords.y, imageSize/2).attr({fill:'white'});

            var image = graph.image(
              '/src/assets/mind/' + gene[0] + 's/' + gene[1] + '.png',
              coords.x - imageSize / 2,
              coords.y - imageSize / 2,
              imageSize, imageSize
            ).addClass("gene");


            circle.hover(function () {
              hoverText = graph.text(coords.x, coords.y, JSON.stringify(gene[1])).addClass("popup");
            }, function () {
              hoverText.remove();
            });

            image.hover(function () {
              hoverText = graph.text(coords.x, coords.y, JSON.stringify(gene[1])).addClass("popup");
            }, function () {
              hoverText.remove();
            });
          }

        });
      }
    },

    render: function () {
      this.$el.html(this.template());

      if(this.prevModel != this.model){
        this.renderDendrogram();
      }

      return this;
    }
  });
});
