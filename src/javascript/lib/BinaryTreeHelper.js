class BinaryTreeHelper {
  constructor(data) {
    this.data = data;
  }

  rightChildIndex(index) {
    return index * 2 + 2;
  };

  leftChildIndex(index) {
    return index * 2 + 1;
  };

  getRowCount() {
    return this.getRowAndColumn(this.data.length - 1).row + 1;
  };

  getRowAndColumn(index) {
    var row = Math.floor(Math.log2(index + 1));
    return {
      row: row,
      column: 1 + index - Math.pow(2, row)
    }
  };

  hasRightChild(index) {
    return !!this.data[this.rightChildIndex(index)];
  };

  hasLeftChild(index) {
    return !!this.data[this.leftChildIndex(index)];
  };

  columnsInRow(row) {
    return Math.pow(2, row);
  };

  isBottomRow(row) {
    return row + 1 >= this.getRowCount();
  };

  getDescendantIndices(index, count) {
    const descendants = [];
    const remainingNodes = [];
    remainingNodes.push(index);
    if (count || count === 0) {
      while (remainingNodes.length > 0 && descendants.length < count) {
        let nodeWithChildren = remainingNodes.shift();
        remainingNodes.push(this.leftChildIndex(nodeWithChildren));
        descendants.push(this.leftChildIndex(nodeWithChildren));

        if (descendants.length < count) {
          remainingNodes.push(this.rightChildIndex(nodeWithChildren));
          descendants.push(this.rightChildIndex(nodeWithChildren));
        } else {
          break;
        }
      }

    } else {
      while (remainingNodes.length > 0) {
        let nodeWithChildren = remainingNodes.shift();
        if (this.hasLeftChild(nodeWithChildren)) {
          remainingNodes.push(this.leftChildIndex(nodeWithChildren))
          descendants.push(this.leftChildIndex(nodeWithChildren))
        } else {
          break;
        }

        if (this.hasRightChild(nodeWithChildren)) {
          remainingNodes.push(this.rightChildIndex(nodeWithChildren))
          descendants.push(this.rightChildIndex(nodeWithChildren))
        } else {
          break;
        }
      }
    }
    return descendants;
  }
}

module.exports = BinaryTreeHelper;