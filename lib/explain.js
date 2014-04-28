var pub = {},
    _, generatorHelper;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    generatorHelper = $inject.generatorHelper;

    return pub;
};

pub.explain = function(generatorName) {
    return generatorHelper.require(generatorName)
        .then(function(generator) {
            return generator.explain();
        });
};
