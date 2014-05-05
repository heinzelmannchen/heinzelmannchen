var pub = {},
    GENERATOR_CONFIG_KEY = 'generators.{0}.npm',
    TEMPLATE_CONFIG_KEY = 'templates.{0}.npm',
    _, Q, npm, requireHelper, prefix, heinzelConfig;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    npm = $inject.npm;
    requireHelper = $inject.requireHelper;
    prefix = $inject.prefix;
    heinzelConfig = $inject.heinzelConfig;

    return pub;
};

pub.install = function(packageName) {
    return npm.install(packageName);
};

pub.installGenerators = function (generators, saveInConfig) {
    var options = {
        prefix: prefix.generator,
        configKey: GENERATOR_CONFIG_KEY,
        saveConfig: saveInConfig
    };
    return installPrefixed(generators, options);
};

pub.installTemplates = function (templates, saveInConfig) {
    var options = {
        prefix: prefix.template,
        configKey: TEMPLATE_CONFIG_KEY,
        saveInConfig: saveInConfig
    };
    return installPrefixed(templates, options);
};

function installPrefixed(packageNames, options) {
    var q = Q.defer();
    packageNames = ensureArray(packageNames);
    packageNames = ensurePrefixes(packageNames, options.prefix);

    npm.install(packageNames)
        .then(function (data) {
            if (!!options.saveInConfig) {
                addToConfig(packageNames, options.configKey)
                    .then(function () {
                        q.resolve(packageNames);
                    })
                    .fail(function (error) {
                        q.reject(error);
                    });
            } else {
                q.resolve(packageNames);
            }
        })
        .fail(function (error) {
            q.reject(error);
        });

    return q.promise;
}

function addToConfig(packageNames, configKey){
    var promises = [];
    _.forEach(packageNames, function (packageName) {
        promises.push(heinzelConfig.saveLocal(configKey.replace('{0}', packageNames), packageName));
    });
    return Q.allSettled(promises);
}


pub.uninstall = function (packageName) {
    return npm.uninstall(packageName);
};

pub.uninstallGenerators = function (generators) {
    var q = Q.defer();
    generators = ensureArray(generators);
    generators = ensurePrefixes(generators, prefix.generator);

    npm.uninstall(generators)
        .then(function (data) {
            q.resolve(generators);
        });

    return q.promise;
};

pub.uninstallTemplates = function (templates) {
    var q = Q.defer();
    templates = ensureArray(templates);
    templates = ensurePrefixes(templates, prefix.template);

    npm.uninstall(templates)
        .then(function (data) {
            q.resolve(templates);
        });

    return q.promise;
};

pub.update = function(packageName) {
    return npm.update(packageName);
};

pub.updateGenerators = function (generators) {
    var q = Q.defer();
    generators = ensureArray(generators);
    generators = ensurePrefixes(generators, prefix.generator);

    npm.update(generators)
        .then(function (data) {
            q.resolve(generators);
        });

    return q.promise;
};

pub.updateTemplates = function (templates) {
    var q = Q.defer();
    templates = ensureArray(templates);
    templates = ensurePrefixes(templates, prefix.template);

    npm.update  (templates)
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