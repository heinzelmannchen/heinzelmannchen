var Q = require('q'),
    _ = require('underscore'),
    me = module.exports;


me.listGenerators = function(config) {
    var q = Q.defer();

    q.resolve(Object.keys(config));

    return q.promise;
};
