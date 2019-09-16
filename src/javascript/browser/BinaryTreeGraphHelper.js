function BinaryTreeGraphHelper(data, iconSize) {
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
    return treeBottomColumnCount * this.columnWidth(this.getRowCount() - 1);
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

  this.columnWidth = function (row=0) {
    if (this.isBottomRow(row)) {
      return iconSize * 2;
    } else {
      return 1.8 * this.columnWidth(row + 1);
    }
  };

  this.rowHeight = function () {
    return iconSize * 2;
  };

  this.isBottomRow = (row) => {
    return row + 1 >= this.getRowCount();
  };

  this.getCoords = function (index) {
    var rowAndColumn = this.getRowAndColumn(index);
    var centerX = this.getWidth() / 2;
    var padding = iconSize;

    var columnOffsetFromCenter = (rowAndColumn.column - (this.columnsInRow(rowAndColumn.row) - 1) / 2) * this.columnWidth(rowAndColumn.row);

    return { x: centerX + columnOffsetFromCenter, y: (rowAndColumn.row) * this.rowHeight() + padding };
  };
};

module.exports = BinaryTreeGraphHelper;