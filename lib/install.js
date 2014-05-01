var pub = {},
    _, Q, npm, requireHelper, prefix;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    npm = $inject.npm;
    requireHelper = $inject.requireHelper;
    prefix = $inject.prefix;

    return pub;
};

pub.install = function(package) {
    return npm.install(package);
};

pub.installGenerators = function (generators) {
    generators = ensureArray(generators);
    generators = ensurePrefixes(generators, prefix.generator);
    return npm.install(generators);
};

pub.installTemplates = function (templates) {
    templates = ensureArray(templates);
    templates = ensurePrefixes(templates, prefix.template);
    return npm.install(templates);
};

function ensureArray(objOrArray) {
    if (!_.isArray(objOrArray)) {
        objOrArray = [objOrArray];
    }
    return objOrArray;
}

function ensurePrefixes(packages, prefix) {
    _.forEach(packages, function (package, index) {
        packages[index] = requireHelper.getPrefixedName(package, prefix);
    });
    return packages;
}

pub.uninstall = function(package) {
    return npm.uninstall(package);
};
