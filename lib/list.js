var Q = require('q'),
    _ = require('underscore'),
    me = module.exports;

/*me.setNpmUtil = function(npmUtilMock) {
    npmUtil = npmUtilMock;
};*/

me.listGenerators = function(config) {
    var q = Q.defer();

    var test = config.generators[0];
    q.resolve('pg');

    return q.promise;
};
