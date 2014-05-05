var pub = {},
    noPrefixRequiredList = ['http', 'https', 'git'],
    _, Q;

module.exports = function($inject) {
    _ = $inject._;
    Q = $inject.Q;

    return pub;
};

pub.require = function(packageName, prefix) {
    var q = Q.defer(),
        package;
    try {
        package = require(pub.getPrefixedName(packageName, prefix));
        q.resolve(package);
    } catch (error) {
        q.reject(error);
    }
    return q.promise;
};

pub.getPrefixedName = function(packageName, prefix) {
    if (_(packageName).startsWith(prefix) || pub.noPrefixRequired(packageName)) {
        return packageName;
    } else {
        return prefix + packageName;
    }
};

pub.noPrefixRequired = function (packageName) {
    return _.every(noPrefixRequiredList, function (noPrefixRequiredEntry) {
        return _(packageName).startsWith(noPrefixRequiredEntry);
    });
};
