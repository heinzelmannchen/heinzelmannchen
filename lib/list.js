var Q = require('q'),
    _ = require('underscore'),
    me = module.exports;

/*me.setNpmUtil = function(npmUtilMock) {
    npmUtil = npmUtilMock;
};*/

me.listGenerators = function(config) {
    var q = Q.defer();

    q.resolve(Object.keys(config.generators));

    return q.promise;
};
