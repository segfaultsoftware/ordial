(function () {
  BinaryTreeGraphHelper = function (data) {
    var rightChildIndex = function (index) {
      return index * 2 + 2;
    };

    var leftChildIndex = function (index) {
      return index * 2 + 1;
    };

    this.getCoords = function (index) {
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
  };
})();
