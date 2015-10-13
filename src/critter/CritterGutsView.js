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

    render: function () {
      this.$el.html(this.template());

      var graph = Snap('#mind-graph');
      graph.clear();

      var genes = this.model.genes;

      var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes, 25);

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
        var coords = binaryTreeGraphHelper.getCoords(index);

        var hoverText;
        var imageSize = 25;
        var image = graph.image(
          '/src/assets/mind/' + gene[0] + 's/' + gene[1] + '.png',
          coords.x -imageSize/2,
          coords.y -imageSize/2,
          imageSize, imageSize
        ).addClass("gene");
        image.hover(function() {
          hoverText = graph.text(coords.x, coords.y, gene[0] +": " + gene[1]).addClass("popup");
        }, function() {
          hoverText.remove();
        });

      });

      return this;
    }
  });
});
