var pub = {},
    GENERATOR_PREFIX = 'heinzelmannchen-gen-',
    _, requireHelper;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    requireHelper = $inject.requireHelper;

    return pub;
};

pub.explain = function(generatorName) {
    return requireHelper.require(generatorName, GENERATOR_PREFIX)
        .then(function(generator) {
            return generator.explain();
        });
};
