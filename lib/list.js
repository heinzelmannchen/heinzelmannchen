var Q = require('q'),
    me = module.exports;

/*me.setNpmUtil = function(npmUtilMock) {
    npmUtil = npmUtilMock;
};*/

me.listGenerators = function(config) {
    var q = Q.defer();

    q.resolve('pg');

    return q.promise;
};
