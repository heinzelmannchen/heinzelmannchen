var pub = {},
    GENERATOR_CONFIG_KEY = 'generators.{0}',
    TEMPLATE_CONFIG_KEY = 'templates.{0}',
    _, Q, npm, requireHelper, prefix, heinzelConfig;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    npm = $inject.npm;
    requireHelper = $inject.requireHelper;
    prefix = $inject.prefix;
    heinzelConfig = $inject.config;

    return pub;
};

pub.install = function(packageName) {
    return npm.install(packageName);
};

pub.installGenerators = function(generators, options) {
	options = options || {};
    options = _.extend(options, {
        prefix: prefix.generator,
        configKey: GENERATOR_CONFIG_KEY
    });
    return installPrefixed(generators, options);
};

pub.installTemplates = function(templates, options) {
    options = options || {};
	options = _.extend(options, {
        prefix: prefix.template,
        configKey: TEMPLATE_CONFIG_KEY
    });
    return installPrefixed(templates, options);
};

function installPrefixed(packageNamesOrUrls, options) {
    var q = Q.defer(),
        packageNames;
    packageNamesOrUrls = ensureArray(packageNamesOrUrls);
    packageNamesOrUrls = ensurePrefixes(packageNamesOrUrls, options.prefix);

    npm.install(packageNamesOrUrls, options)
        .then(function(data) {
            if ( !! options.saveInConfig) {
                addToConfig(packageNamesOrUrls, options.configKey)
                    .then(function() {
                        q.resolve(packageNamesOrUrls);
                    })
                    .fail(function(error) {
                        q.reject(error);
                    });
            } else {
                q.resolve(packageNamesOrUrls);
            }
        })
        .fail(function(error) {
            q.reject(error);
        });

    return q.promise;
}

function addToConfig(packageNamesOrUrls, configKey) {
    var promises = [],
        packageNames = pub.resolvePackageNameFromUrl(packageNamesOrUrls),
        configName;

    _.forEach(packageNames, function (packageName, index) {
        configName = configKey.replace('{0}', packageName);
        if (!existsInConfig(configName)) {
            promises.push(heinzelConfig.saveLocal(configName, packageNamesOrUrls[index]));
        }
    });
    return Q.allSettled(promises);
}

function removeFromConfig(packageNamesOrUrls, configKey) {
    var promises = [],
        packageNames = pub.resolvePackageNameFromUrl(packageNamesOrUrls);

    _.forEach(packageNames, function(packageName, index) {
        promises.push(heinzelConfig.removeLocal(configKey.replace('{0}', packageName), packageNamesOrUrls[index]));
    });
    return Q.allSettled(promises);
}

pub.resolvePackageNameFromUrl = function(urls) {
    var packageNames = [],
        nameWithoutPrefix,
        nameWithoutSuffix;
    _.forEach(urls, function(url) {
        nameWithoutPrefix = _.last(_.compact(url.split('/')));
        nameWithoutSuffix = nameWithoutPrefix.match('([0-9]|[a-z]|-)+')[0];
        packageNames.push(nameWithoutSuffix);
    });
    return packageNames;
};

pub.uninstall = function(packageName) {
    return npm.uninstall(packageName);
};

pub.uninstallGenerators = function(generators, saveInConfig) {
    var options = {
        prefix: prefix.generator,
        configKey: GENERATOR_CONFIG_KEY,
        saveInConfig: saveInConfig
    };
    return uninstallPrefixed(generators, options);
};

pub.uninstallTemplates = function(templates, saveInConfig) {
    var options = {
        prefix: prefix.template,
        configKey: TEMPLATE_CONFIG_KEY,
        saveInConfig: saveInConfig
    };

    return uninstallPrefixed(templates, options);
};

function uninstallPrefixed(packageNamesOrUrls, options) {
    var q = Q.defer(),
        packageNames;
    packageNamesOrUrls = ensureArray(packageNamesOrUrls);
    packageNamesOrUrls = ensurePrefixes(packageNamesOrUrls, options.prefix);

    npm.uninstall(packageNamesOrUrls)
        .then(function(data) {
            if ( !! options.saveInConfig) {
                removeFromConfig(packageNamesOrUrls, options.configKey)
                    .then(function() {
                        q.resolve(packageNamesOrUrls);
                    })
                    .fail(function(error) {
                        q.reject(error);
                    });
            } else {
                q.resolve(packageNamesOrUrls);
            }
        })
        .fail(function(error) {
            q.reject(error);
        });

    return q.promise;
}

pub.update = function(packageName) {
    return npm.update(packageName);
};

pub.updateGenerators = function(generators) {
    var q = Q.defer();
    generators = ensureArray(generators);
    generators = ensurePrefixes(generators, prefix.generator);

    npm.update(generators)
        .then(function(data) {
            q.resolve(generators);
        });

    return q.promise;
};

pub.updateTemplates = function(templates) {
    var q = Q.defer();
    templates = ensureArray(templates);
    templates = ensurePrefixes(templates, prefix.template);

    npm.update(templates)
        .then(function(data) {
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
    _.forEach(packages, function(packageName, index) {
        packageName = tryGetFromConfig(packageName);
        packages[index] = requireHelper.getPrefixedName(packageName, prefix);
    });
    return packages;
}

function tryGetFromConfig(packageName) {
    var tmp = null;
    try {
        tmp = heinzelConfig.get('generators.' + packageName);
        packageName = tmp;
    } catch (error) {}
    try {
        tmp = heinzelConfig.get('templates.' + packageName);
        packageName = tmp;
    } catch (error) {}
    return packageName;
}

function existsInConfig(packageName) {
    try {
        heinzelConfig.get(packageName);
        return true;
    } catch (error) {
        return false;
    }
}