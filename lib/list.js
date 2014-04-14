var Q = require('q'),
    me = module.exports;

me.get = function(config) {
    var q = Q.defer();
    q.resolve(Object.keys(config));
    return q.promise;
};
