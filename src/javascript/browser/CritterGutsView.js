CritterGutsView = Backbone.View.extend({
  initialize: function () {
    this.model = {};
    singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
    this.graph = Snap('#mind-graph').attr({width: 0, height: 0});
  },

  events: {
    'click #hide-junk-dna-checkbox': 'toggleJunkDna'
  },

  setCritter: function (options) {
    this.model = options.critter;
    this.render();
  },

  template: function () {
    return JST['src/viewTemplates/critterGuts.template.html'](this.model);
  },

  filter: function(genes){
    genes = _.clone(genes) || [];
    var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes, 1234);
    if(singletonContext.configuration.hideJunkDna){
      _.each(genes, function(gene, index){
        if(!gene || gene[0] == 'action'){
          if(binaryTreeGraphHelper.hasLeftChild(index)){
            genes[binaryTreeGraphHelper.leftChildIndex(index)] = null;
          }
          if(binaryTreeGraphHelper.hasRightChild(index)) {
            genes[binaryTreeGraphHelper.rightChildIndex(index)] = null;
          }
        }
      });
    }

    var lastNonNullIndex = _.findLastIndex(genes, function(gene){
      return !!gene;
    });
    genes.splice(lastNonNullIndex + 1);
    return genes;
  },

  toggleJunkDna: function() {
    singletonContext.configuration.hideJunkDna = !singletonContext.configuration.hideJunkDna;
    this.renderDendrogram();
  },

  renderDendrogram: function () {
    this.prevModel = this.model;
    var genes = this.model.genes;
    var graph = this.graph;
    graph.clear();

    if (genes) {
      genes = this.filter(genes);

      var imageSize = 50;
      var binaryTreeGraphHelper = new BinaryTreeGraphHelper(genes, imageSize);
      graph.attr({width: Math.max(800, binaryTreeGraphHelper.getWidth()), height: binaryTreeGraphHelper.getHeight()});

       var midpoint = function(coords1, coords2){
          return {
            x: ( coords1.x + coords2.x)/2,
            y: ( coords1.y + coords2.y)/2
          };
        };

      _.each(genes, function renderLines(gene, index) {
        var coords = binaryTreeGraphHelper.getCoords(index);

        if (binaryTreeGraphHelper.hasLeftChild(index)) {
          var leftChildCoords = binaryTreeGraphHelper.getLeftChildCoords(index);
          graph.line(
                  coords.x,
                  coords.y,
                  leftChildCoords.x,
                  leftChildCoords.y)
                .addClass('left');

          var leftMidpoint = midpoint(coords, leftChildCoords);
          graph.text(leftMidpoint.x - 10, leftMidpoint.y + 5, 'Yes');
        }

        if (binaryTreeGraphHelper.hasRightChild(index)) {
          var rightChildCoords = binaryTreeGraphHelper.getRightChildCoords(index);
          graph.line(
                  coords.x,
                  coords.y,
                  rightChildCoords.x,
                  rightChildCoords.y)
                .addClass('right');

          var rightMidpoint = midpoint(coords, rightChildCoords);
          graph.text(rightMidpoint.x - 5, rightMidpoint.y + 5, 'No');
        }
      });

      _.each(genes, function renderImage(gene, index) {
        if (gene) {
          var coords = binaryTreeGraphHelper.getCoords(index);
          var geneType = gene[0];
          var geneValue = gene[1];

          var typeColor = geneType == 'action' ? 'lightgreen' : '#b1c9ed';

          var displayImageName = geneValue;
          if(_.isArray(geneValue)){
            displayImageName = _.first(geneValue);
            if(geneValue.length > 1){
              graph.circle(coords.x - 5, coords.y - 5, imageSize * 0.8).attr({fill: typeColor});
            }
          }

          var typeCircle = graph.circle(coords.x, coords.y, imageSize * 0.8).attr({fill: typeColor});
          var circle = graph.circle(coords.x, coords.y, imageSize * 0.7).attr({fill: 'white'});

          var image = graph.image(
            '/src/assets/mind/' + geneType + 's/' + displayImageName + '.png',
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

    if (this.model && (this.prevModel != this.model)) {
      this.renderDendrogram();
    }

    return this;
  }
});