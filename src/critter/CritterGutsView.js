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

      var transformCoordinate = function (number) {
        return (number + 1) * 50;
      };

      var graph = Snap('#mind-graph');
      graph.clear();

      var genes = this.model.genes;
      var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes);

      _.each(genes, function (gene, index) {
        var coords = binaryTreeGraphHelper.getCoords(index);

        var hoverText;
        var image = graph.image(
          '/src/assets/mind/' + gene[0] + 's/' + gene[1] + '.png',
          transformCoordinate(coords.column),
          transformCoordinate(coords.row), 25, 25
        ).addClass("gene");
        image.hover(function() {
            hoverText = graph.text(transformCoordinate(coords.column), transformCoordinate(coords.row), gene[0] +": " + gene[1]).addClass("popup");
          }, function() {
            hoverText.remove();
          });

        if (binaryTreeGraphHelper.hasLeftChild(index)) {
          var leftChildCoords = binaryTreeGraphHelper.getLeftChildCoords(index);
          graph.line(
            transformCoordinate(coords.column),
            transformCoordinate(coords.row),
            transformCoordinate(leftChildCoords.column),
            transformCoordinate(leftChildCoords.row));
        }

        if (binaryTreeGraphHelper.hasRightChild(index)) {
          var rightChildCoords = binaryTreeGraphHelper.getRightChildCoords(index);
          graph.line(
            transformCoordinate(coords.column),
            transformCoordinate(coords.row),
            transformCoordinate(rightChildCoords.column),
            transformCoordinate(rightChildCoords.row));
        }
      });

      return this;
    }
  });
});
