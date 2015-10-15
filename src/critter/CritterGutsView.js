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

    renderDendrogram: function () {
      this.prevModel = this.model;
      var genes = this.model.genes;
      var graph = Snap('#mind-graph').attr({width: 0, height: 0});
      graph.clear();

      if (genes) {

        var imageSize = 50;
        var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes, imageSize);
        graph.attr({width: Math.max(800, binaryTreeGraphHelper.getWidth()), height: binaryTreeGraphHelper.getHeight()});

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


            var typeColor = gene[0] == 'action' ? 'lightgreen' : '#b1c9ed';
            var typeCircle = graph.circle(coords.x, coords.y, imageSize * 0.8).attr({fill: typeColor});
            var circle = graph.circle(coords.x, coords.y, imageSize * 0.7).attr({fill: 'white'});
            var image = graph.image(
              '/src/assets/mind/' + gene[0] + 's/' + gene[1] + '.png',
              coords.x - imageSize / 2,
              coords.y - imageSize / 2,
              imageSize, imageSize
            ).addClass("gene");

            var hoverText, hoverTextRect;
            var addHoverText = function () {
              hoverTextRect = graph.rect(coords.x - 55, coords.y - 35, 20, 20, 5, 5)
                .attr({
                  fill: "rgba(236, 240, 241, 0.50)"
                });

              hoverText = graph.text(coords.x - 50, coords.y - 20, JSON.stringify(gene[1])).addClass("popup")
                .attr({'pointer-events': 'none'});

              hoverTextRect.attr({
                width: (hoverText.node.clientWidth + 10),
                'pointer-events': 'none'
              });
            };

            var removeHoverText = function () {
              hoverText.remove();
              hoverTextRect.remove();
            };

            circle.hover(addHoverText, removeHoverText);
            image.hover(addHoverText, removeHoverText);
            typeCircle.hover(addHoverText, removeHoverText);
          }
        });
      }
    },

    render: function () {
      this.$el.html(this.template());

      if (this.prevModel != this.model) {
        this.renderDendrogram();
      }

      return this;
    }
  });
});
