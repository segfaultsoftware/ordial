(function () {
  BinaryTreeGraphHelper = function (data, iconSize) {
    this.rightChildIndex = function (index) {
      return index * 2 + 2;
    };

    this.leftChildIndex = function (index) {
      return index * 2 + 1;
    };

    this.getRowCount = function () {
      return this.getRowAndColumn(data.length - 1).row + 1;
    };

    this.getWidth = function () {
      var treeBottomColumnCount = Math.pow(2, this.getRowCount() - 1);
      return treeBottomColumnCount * this.columnWidth();
    };

    this.getHeight = function () {
      return this.getRowCount() * this.rowHeight();
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
      return this.getCoords(this.rightChildIndex(index));
    };

    this.hasRightChild = function (index) {
      return !!data[this.rightChildIndex(index)];
    };

    this.hasLeftChild = function (index) {
      return !!data[this.leftChildIndex(index)];
    };

    this.columnsInRow = function (row) {
      return Math.pow(2, row);
    };

    this.columnWidth = function () {
      return iconSize * 2;
    };

    this.rowHeight = function () {
      return this.columnWidth();
    };

    this.getCoords = function (index) {
      var rowAndColumn = this.getRowAndColumn(index);
      var centerX = this.getWidth() / 2;
      var padding = iconSize;

      var columnOffsetFromCenter = (rowAndColumn.column - (this.columnsInRow(rowAndColumn.row) - 1) / 2) * this.columnWidth();

      return {x: centerX + columnOffsetFromCenter, y: (rowAndColumn.row) * this.columnWidth() + padding};
    };
  };
})();
