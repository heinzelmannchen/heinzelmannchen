var pub = {},
    GENERATOR_PREFIX = 'heinzelmannchen-gen-',
    _, Q;

module.exports = function($inject) {
    _ = $inject._;
    Q = $inject.Q;

    return pub;
};


pub.require = function(generatorName) {
    var q = Q.defer(),
        generator;
    try {
        generator = require(pub.getPrefixedName(generatorName));
        q.resolve(generator);
    } catch (error) {
        q.reject(error);
    }
    return q.promise;
};

pub.getPrefixedName = function(generatorName) {
    if (_(generatorName).startsWith(GENERATOR_PREFIX)) {
        return generatorName;
    } else {
        return GENERATOR_PREFIX + generatorName;
    }
};
