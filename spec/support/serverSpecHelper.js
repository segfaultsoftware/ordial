var SingletonContext = require("../../src/javascript/lib/SingletonContext");

beforeEach(function () {
  singletonContext = new SingletonContext();
  singletonContext.configuration.resourceSpawnRate = 0.0;

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
});
