describe("BinaryTreeGraphHelper", function () {
  var binaryTreeGraphHelper, iconSize;
  beforeEach(function () {
    iconSize = 25;

    var data = ['a', 'b', 'c', 'd'];
    binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
  });

  describe('#getWidth', function() {
    it('returns the minimum width needed to fit the graph', function() {
      expect(binaryTreeGraphHelper.getWidth()).toEqual(200);
    });
  });

  describe('getHeight', function() {
    describe("when there are 4 items", function(){
      beforeEach(function(){
        var data = ['a', 'b', 'c', 'd'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 3 rows', function() {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(3 * 50);
      });
    });

    describe("when there are 7 items", function(){
      beforeEach(function(){
        var data = ['a', 'b', 'c', 'd', '5', '6', '007'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 3 rows', function() {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(3 * 50);
      });
    });

    describe("when there are 8 items", function(){
      beforeEach(function(){
        var data = ['a', 'b', 'c', 'd', '5', '6', '007', 'eight!'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 4 rows', function() {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(4 * 50);
      });
    });
  });

  describe("#getRowAndColumn", function () {
    it("returns an object with the row and column attributes", function () {
      expect(binaryTreeGraphHelper.getRowAndColumn(0)).toEqual({row: 0, column: 0});
      expect(binaryTreeGraphHelper.getRowAndColumn(1)).toEqual({row: 1, column: 0});
      expect(binaryTreeGraphHelper.getRowAndColumn(2)).toEqual({row: 1, column: 1});
      expect(binaryTreeGraphHelper.getRowAndColumn(3)).toEqual({row: 2, column: 0});
      expect(binaryTreeGraphHelper.getRowAndColumn(34)).toEqual({row: 5, column: 3});
    });

    describe("the seventh item", function(){
      it("is the fourth item in the third row", function(){
        expect(binaryTreeGraphHelper.getRowAndColumn(6)).toEqual({row: 2, column: 3});
      });
    })
  });

  describe("#columnsInRow", function () {
    it("returns the number of columns in a given row", function () {
      expect(binaryTreeGraphHelper.columnsInRow(0)).toEqual(1);
      expect(binaryTreeGraphHelper.columnsInRow(1)).toEqual(2);
      expect(binaryTreeGraphHelper.columnsInRow(2)).toEqual(4);
      expect(binaryTreeGraphHelper.columnsInRow(4)).toEqual(16);
    });
  });

  describe("#getCoords", function () {
    describe("when there are 3 rows", function () {
      describe("index 0", function () {
        it("is centered above the base of the tree", function () {
          expect(binaryTreeGraphHelper.getCoords(0)).toEqual({x: ((4 + 4) * 25) / 2, y: 25});
        });
      });

      describe("the first element in the bottom row", function () {
        it("is on the far left plus a padding of icon size", function () {
          expect(binaryTreeGraphHelper.getCoords(3).x).toEqual(25);
        });

        it("is at the bottom.", function () {
          expect(binaryTreeGraphHelper.getCoords(3).y).toEqual(125);
        });
      });

      describe("the last element in the bottom row", function () {
        it("is on the far right minus a padding of icon size", function () {
          expect(binaryTreeGraphHelper.getCoords(6).x).toEqual(175);
        });
      });
    });
  });

  describe("#getLeftChildCoords", function () {
    it("returns the coordinates for the left child", function () {
      expect(binaryTreeGraphHelper.getLeftChildCoords(0)).toEqual(binaryTreeGraphHelper.getCoords(1));
    });
  });

  describe("#getRightChildCoords", function () {
    it("returns the coordinates for the right child", function () {
      expect(binaryTreeGraphHelper.getRightChildCoords(0)).toEqual(binaryTreeGraphHelper.getCoords(2));
    });
  });

  describe("#hasLeftChild", function () {
    beforeEach(function () {
      var data = ['a', undefined, 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
      binaryTreeGraphHelper = new BinaryTreeGraphHelper(data);
    });

    it('returns true', function () {
      expect(binaryTreeGraphHelper.hasLeftChild(2)).toBeTruthy();
    });

    describe("when the child index is outside the array", function () {
      it("returns false", function () {
        expect(binaryTreeGraphHelper.hasLeftChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function () {
      it("returns false", function () {
        expect(binaryTreeGraphHelper.hasLeftChild(0)).toBeFalsy();
      });
    });
  });

  describe("#hasRightChild", function () {
    beforeEach(function () {
      var data = ['a', 'b', undefined, 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
      binaryTreeGraphHelper = new BinaryTreeGraphHelper(data);
    });

    it('returns true', function () {
      expect(binaryTreeGraphHelper.hasRightChild(1)).toBeTruthy();
    });

    describe("when the child index is outside the array", function () {
      it("returns false", function () {
        expect(binaryTreeGraphHelper.hasRightChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function () {
      it("returns false", function () {
        expect(binaryTreeGraphHelper.hasRightChild(0)).toBeFalsy();
      });
    });
  });
});
