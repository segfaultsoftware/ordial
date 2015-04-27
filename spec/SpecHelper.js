beforeEach(function () {
  window.singletonContext = new SingletonContext();
  window.singletonContext.configuration.resourceSpawnRate = 0.0;

  jasmine.addMatchers({
    toMatchArray: function () {
      return {
        compare: function (actual, expected) {
          var actualJsoned = _.map(actual, JSON.stringify).sort();
          var expectedJsoned = _.map(expected, JSON.stringify).sort();

          return {
            pass: JSON.stringify(actualJsoned) == JSON.stringify(expectedJsoned)
          };
        }
      };
    }
  });

  $("#testing-area").html("");
});
