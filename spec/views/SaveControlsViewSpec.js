describe("SaveControlsView", function(){
  beforeEach(function() {
    $("#testing-area").html('<div id="SaveControlsViewSpec">');
    view = new SaveControlsView({el: "#SaveControlsViewSpec"});
    view.render();
  });
  
  var serializedWorld;
  beforeEach(function(){
    serializedWorld = 'SERIALIZED_WORLD_CONTENT';
  });
  
  describe("when the user clicks save", function(){
    
    it("serializes the world and sets that as the content in the text area", function(){
      spyOn(singletonContext.worldSerializer, 'serialize')
        .and.returnValue(serializedWorld);
      $('.save-button').click();
      expect($('.load-text').val()).toBe(serializedWorld);
    });
  });
  
  describe('when the user clicks load', function(){
    it("loads the world", function(){
      $('.load-text').val(serializedWorld);
      spyOn(singletonContext.worldSerializer, 'deserialize');
      $('.load-button').click();
      expect(singletonContext.worldSerializer.deserialize)
        .toHaveBeenCalledWith(serializedWorld, singletonContext.world);
    });
  });
});