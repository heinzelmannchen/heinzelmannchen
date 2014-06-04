var pub = {},
    GENERATOR_PREFIX = 'heinzelmannchen-gen-',
    Q,_, requireHelper;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    requireHelper = $inject.requireHelper;

    return pub;
};

pub.explain = function(generatorName) {
    var q = Q.defer(),
        explanation;
    try {
        explanation = requireHelper.require(generatorName, GENERATOR_PREFIX).explain();
        q.resolve(explanation);
    } catch (error) {
        q.reject(error);
    }
    return q.promise;
};
