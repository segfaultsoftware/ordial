const _ = require('underscore');

function Configuration(options) {
  var config = _.defaults(options || {},{
    resourceSpawnRate: 1,
    decompositionTime: 4,
    hideJunkDna: false
  });
  Object.assign(this, config);
}

module.exports = Configuration;
