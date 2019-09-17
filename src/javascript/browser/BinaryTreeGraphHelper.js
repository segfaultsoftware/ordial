const BinaryTreeHelper = require("../lib/BinaryTreeHelper");

function BinaryTreeGraphHelper(data, iconSize) {
  this.treeHelp = new BinaryTreeHelper(data);

  this.hasRightChild = (index)=> { return this.treeHelp.hasRightChild(index)};
  this.hasLeftChild = (index)=> { return this.treeHelp.hasLeftChild(index)};
  this.rightChildIndex = (index)=> { return this.treeHelp.rightChildIndex(index)};
  this.leftChildIndex = (index)=> { return this.treeHelp.leftChildIndex(index)};

  this.getWidth = function () {
    var treeBottomColumnCount = Math.pow(2, this.treeHelp.getRowCount() - 1);
    return treeBottomColumnCount * this.columnWidth(this.treeHelp.getRowCount() - 1);
  };

  this.getHeight = function () {
    return this.treeHelp.getRowCount() * this.rowHeight();
  };
  this.getLeftChildCoords = function (index) {
    return this.getCoords(index * 2 + 1);
  };

  this.getRightChildCoords = function (index) {
    return this.getCoords(this.treeHelp.rightChildIndex(index));
  };

  this.columnWidth = function (row = 0) {
    if (this.treeHelp.isBottomRow(row)) {
      return iconSize * 2;
    } else {
      return 1.8 * this.columnWidth(row + 1);
    }
  };

  this.rowHeight = function () {
    return iconSize * 2;
  };

  this.getCoords = function (index) {
    var rowAndColumn = this.treeHelp.getRowAndColumn(index);
    var centerX = this.getWidth() / 2;
    var padding = iconSize;

    var columnOffsetFromCenter = (rowAndColumn.column - (this.treeHelp.columnsInRow(rowAndColumn.row) - 1) / 2) * this.columnWidth(rowAndColumn.row);

    return { x: centerX + columnOffsetFromCenter, y: (rowAndColumn.row) * this.rowHeight() + padding };
  };
};

module.exports = BinaryTreeGraphHelper;