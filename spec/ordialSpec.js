describe("Ordial", function() {
  beforeEach(function() {
    this.ordial = new Ordial();
  });


  it("should have a world", function(){
    expect(this.ordial.world).not.toBeUndefined();
  });

  describe("when the pause button is clicked", function() {
    it("toggles the paused flag");
    describe("when unpausing", function(){
      it("should updateWorld");
    })
  });

  describe("updateWorld", function(){
    it("should render the world");
    it("should update the world");
    it('should defer an updateWorld for later');

    describe("when paused", function(){
      it("should render the world");
      it("should not update the world");
      it('should not defer an updatedWorld for later');
    })
  });
});