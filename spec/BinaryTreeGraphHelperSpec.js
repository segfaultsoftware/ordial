describe("BinaryTreeGraphHelper", function () {
  var binaryTreeGraphHelper;
  beforeEach(function () {
    binaryTreeGraphHelper = new BinaryTreeGraphHelper();
  });

  describe("#getCoords", function () {
    it("returns an object with the row and column attributes", function () {
      expect(binaryTreeGraphHelper.getCoords(0)).toEqual({row: 0, column: 0});
      expect(binaryTreeGraphHelper.getCoords(1)).toEqual({row: 1, column: 0});
      expect(binaryTreeGraphHelper.getCoords(2)).toEqual({row: 1, column: 1});
      expect(binaryTreeGraphHelper.getCoords(3)).toEqual({row: 2, column: 0});
      expect(binaryTreeGraphHelper.getCoords(34)).toEqual({row: 5, column: 3});
    });
  });

  describe("#getLeftChildCoords", function () {
    it("returns an object with the row and column attributes", function () {
      expect(binaryTreeGraphHelper.getLeftChildCoords(0)).toEqual({row: 1, column: 0});
      expect(binaryTreeGraphHelper.getLeftChildCoords(1)).toEqual({row: 2, column: 0});
      expect(binaryTreeGraphHelper.getLeftChildCoords(2)).toEqual({row: 2, column: 2});
      expect(binaryTreeGraphHelper.getLeftChildCoords(3)).toEqual({row: 3, column: 0});
      expect(binaryTreeGraphHelper.getLeftChildCoords(34)).toEqual({row: 6, column: 6});
    });
  });

  describe("#getRightChildCoords", function () {
    it("returns an object with the row and column attributes", function () {
      expect(binaryTreeGraphHelper.getRightChildCoords(0)).toEqual({row: 1, column: 1});
      expect(binaryTreeGraphHelper.getRightChildCoords(1)).toEqual({row: 2, column: 1});
      expect(binaryTreeGraphHelper.getRightChildCoords(2)).toEqual({row: 2, column: 3});
      expect(binaryTreeGraphHelper.getRightChildCoords(3)).toEqual({row: 3, column: 1});
      expect(binaryTreeGraphHelper.getRightChildCoords(34)).toEqual({row: 6, column: 7});
    });
  });

  describe("#hasLeftChild", function(){
    beforeEach(function() {
      var data = ['a',undefined,'c','d','e','f','g','h','i','j','k'];
      binaryTreeGraphHelper = new BinaryTreeGraphHelper(data);
    });

    it('returns true', function() {
      expect(binaryTreeGraphHelper.hasLeftChild(2)).toBeTruthy();
    });

    describe("when the child index is outside the array", function(){
      it("returns false", function(){
        expect(binaryTreeGraphHelper.hasLeftChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function(){
      it("returns false", function(){
        expect(binaryTreeGraphHelper.hasLeftChild(0)).toBeFalsy();
      });
    });
  });

  describe("#hasRightChild", function(){
    beforeEach(function() {
      var data = ['a','b',undefined,'d','e','f','g','h','i','j','k'];
      binaryTreeGraphHelper = new BinaryTreeGraphHelper(data);
    });

    it('returns true', function() {
      expect(binaryTreeGraphHelper.hasRightChild(1)).toBeTruthy();
    });

    describe("when the child index is outside the array", function(){
      it("returns false", function(){
        expect(binaryTreeGraphHelper.hasRightChild(8)).toBeFalsy();
      });
    });

    describe("when the child is undefined", function(){
      it("returns false", function(){
        expect(binaryTreeGraphHelper.hasRightChild(0)).toBeFalsy();
      });
    });
  });
});
