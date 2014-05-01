var pub = {},
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
    if (_(packageName).startsWith(prefix)) {
        return packageName;
    } else {
        return prefix + packageName;
    }
};
