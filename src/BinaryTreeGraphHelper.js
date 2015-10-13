(function () {
  BinaryTreeGraphHelper = function (data, iconSize) {
    var rightChildIndex = function (index) {
      return index * 2 + 2;
    };

    var leftChildIndex = function (index) {
      return index * 2 + 1;
    };

    this.getRowAndColumn = function (index) {
      var row = Math.floor(Math.log2(index + 1));
      return {
        row: row,
        column: 1 + index - Math.pow(2, row)
      }
    };

    this.getLeftChildCoords = function (index) {
      return this.getCoords(index * 2 + 1);
    };

    this.getRightChildCoords = function (index) {
      return this.getCoords(rightChildIndex(index));
    };

    this.hasRightChild = function (index) {
      return !!data[rightChildIndex(index)];
    };

    this.hasLeftChild = function (index) {
      return !!data[leftChildIndex(index)];
    };

    this.columnsInRow = function(row){
      return Math.pow(2, row);
    };

    this.getCoords = function (index) {
      var rowAndColumn = this.getRowAndColumn(index);
      var lastRow = this.getRowAndColumn(data.length).row;
      var treeBottomColumnCount = Math.pow(2, lastRow);
      var columnWidth = iconSize * 2;
      var treeWidth = treeBottomColumnCount * columnWidth;
      var centerX = treeWidth / 2;
      var padding = iconSize;

      var columnOffsetFromCenter = (rowAndColumn.column - (this.columnsInRow(rowAndColumn.row) - 1) / 2) * columnWidth;

      return {x: centerX + columnOffsetFromCenter, y: (rowAndColumn.row) * columnWidth + padding};
    };
  };
})();
