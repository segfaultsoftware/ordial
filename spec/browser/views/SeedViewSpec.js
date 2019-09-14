var Seed = require("../../../src/javascript/lib/models/Seed");
var SeedView = require("../../../src/javascript/browser/views/SeedView");

describe("SeedView", function() {
  var seed, seedView;

  beforeEach(function() {
    seed = new Seed({seedValue: 'foo'});
    seedView = new SeedView({model: seed});
    seedView.render();
  });

  describe("#disableInput", function() {
    it('should disable the input', function() {
      expect(seedView.$el.find('#seed-input').attr('disabled')).toBeFalsy();
      seedView.disableInput();
      seedView.render();
      expect(seedView.$el.find('#seed-input').attr('disabled')).toBeTruthy();
    });
  });

  it('on blur, the view should save the input field to its model', function() {
    seedView.$el.find('#seed-input').val('bar');
    seedView.$el.find('#seed-input').blur();
    expect(seed.get('seedValue')).toBe('bar');
  });

  it("should render the seed's seedValue", function() {
    var value = seedView.$el.find('#seed-input').val();
    expect(value).toBe('foo');
  });
});