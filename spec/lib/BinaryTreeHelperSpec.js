var BinaryTreeHelper = require("../../src/javascript/lib/BinaryTreeHelper")

describe("BinaryTreeHelper", () => {
  var binaryTreeHelper;
  beforeEach(function () {

    var data = ['a', 'b', 'c', 'd'];
    binaryTreeHelper = new BinaryTreeHelper(data);
  });

  describe("#getRowAndColumn", function () {
    it("returns an object with the row and column attributes", function () {
      expect(binaryTreeHelper.getRowAndColumn(0)).toEqual({ row: 0, column: 0 });
      expect(binaryTreeHelper.getRowAndColumn(1)).toEqual({ row: 1, column: 0 });
      expect(binaryTreeHelper.getRowAndColumn(2)).toEqual({ row: 1, column: 1 });
      expect(binaryTreeHelper.getRowAndColumn(3)).toEqual({ row: 2, column: 0 });
      expect(binaryTreeHelper.getRowAndColumn(34)).toEqual({ row: 5, column: 3 });
    });

    describe("the seventh item", function () {
      it("is the fourth item in the third row", function () {
        expect(binaryTreeHelper.getRowAndColumn(6)).toEqual({ row: 2, column: 3 });
      });
    })
  });

  describe("#columnsInRow", function () {
    it("returns the number of columns in a given row", function () {
      expect(binaryTreeHelper.columnsInRow(0)).toEqual(1);
      expect(binaryTreeHelper.columnsInRow(1)).toEqual(2);
      expect(binaryTreeHelper.columnsInRow(2)).toEqual(4);
      expect(binaryTreeHelper.columnsInRow(4)).toEqual(16);
    });
  });


  describe("#hasLeftChild", function () {
    beforeEach(function () {
      var data = ['a', undefined, 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
      binaryTreeHelper = new BinaryTreeHelper(data);
    });

    it('returns true', function () {
      expect(binaryTreeHelper.hasLeftChild(2)).toBeTruthy();
    });

    describe("when the child index is outside the array", function () {
      it("returns false", function () {
        expect(binaryTreeHelper.hasLeftChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function () {
      it("returns false", function () {
        expect(binaryTreeHelper.hasLeftChild(0)).toBeFalsy();
      });
    });
  });

  describe("#hasRightChild", function () {
    beforeEach(function () {
      var data = ['a', 'b', undefined, 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
      binaryTreeHelper = new BinaryTreeHelper(data);
    });

    it('returns true', function () {
      expect(binaryTreeHelper.hasRightChild(1)).toBeTruthy();
    });

    describe("when the child index is outside the array", function () {
      it("returns false", function () {
        expect(binaryTreeHelper.hasRightChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function () {
      it("returns false", function () {
        expect(binaryTreeHelper.hasRightChild(0)).toBeFalsy();
      });
    });
  });

  describe("#getDescendantIndices", () => {
    it("returns the indices of the children for the given index", () => {
      expect(binaryTreeHelper.getDescendantIndices(0, 2)).toEqual([1, 2]);
      expect(binaryTreeHelper.getDescendantIndices(2, 2)).toEqual([5, 6]);
    });

    describe("when it is not passed a count", () => {
      it("only returns indices that exist in the tree", () => {
        expect(binaryTreeHelper.getDescendantIndices(0)).toEqual([1, 2, 3]);
      });
    });
  });
});