var BinaryTreeGraphHelper = require("../../src/javascript/browser/BinaryTreeGraphHelper")

describe("BinaryTreeGraphHelper", function () {
  var binaryTreeGraphHelper, iconSize;
  beforeEach(function () {
    iconSize = 25;

    var data = ['a', 'b', 'c', 'd'];
    binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
  });

  describe('#getWidth', function () {
    it('returns the minimum width needed to fit the graph', function () {
      expect(binaryTreeGraphHelper.getWidth()).toEqual(200);
    });
  });

  describe('getHeight', function () {
    describe("when there are 4 items", function () {
      beforeEach(function () {
        var data = ['a', 'b', 'c', 'd'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 3 rows', function () {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(3 * 50);
      });
    });

    describe("when there are 7 items", function () {
      beforeEach(function () {
        var data = ['a', 'b', 'c', 'd', '5', '6', '007'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 3 rows', function () {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(3 * 50);
      });
    });

    describe("when there are 8 items", function () {
      beforeEach(function () {
        var data = ['a', 'b', 'c', 'd', '5', '6', '007', 'eight!'];
        binaryTreeGraphHelper = new BinaryTreeGraphHelper(data, 25);
      });

      it('returns enough height for 4 rows', function () {
        expect(binaryTreeGraphHelper.getHeight()).toEqual(4 * 50);
      });
    });
  });

  describe("#getCoords", function () {
    describe("when there are 3 rows", function () {
      describe("index 0", function () {
        it("is centered above the base of the tree", function () {
          expect(binaryTreeGraphHelper.getCoords(0)).toEqual({ x: ((4 + 4) * 25) / 2, y: 25 });
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

});
