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
    var q = Q.defer();
    generators = ensureArray(generators);
    generators = ensurePrefixes(generators, prefix.generator);
    
    npm.install(generators)
        .then(function (data) {
            q.resolve(generators);
        });

    return q.promise;
};

pub.installTemplates = function (templates) {
    var q = Q.defer();
    templates = ensureArray(templates);
    templates = ensurePrefixes(templates, prefix.template);

    npm.install(templates)
        .then(function (data) {
            q.resolve(templates);
        });

    return q.promise;
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
