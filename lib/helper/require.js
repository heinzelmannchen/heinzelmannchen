var pub = {},
    noPrefixRequiredList = ['http', 'https', 'git'],
    _, Q;

module.exports = function($inject) {
    _ = $inject._;
    Q = $inject.Q;

    return pub;
};

pub.require = function(packageName, prefix) {
    var nodePackage;
    try {
        nodePackage = require(process.cwd() + '/node_modules/' + pub.getPrefixedName(packageName, prefix));
        return nodePackage;
    } catch (error) {
        try {
            nodePackage = require(pub.getPrefixedName(packageName, prefix));
            return nodePackage;
        } catch (error) {
            throw error;
        }
    }
};

pub.getPrefixedName = function (packageName, prefix) {
    if (_(packageName).startsWith(prefix) || pub.noPrefixRequired(packageName)) {
        return packageName;
    } else {
        return prefix + packageName;
    }
};

pub.noPrefixRequired = function (packageName) {
    return _.some(noPrefixRequiredList, function (noPrefixRequiredEntry) {
        return _(packageName).startsWith(noPrefixRequiredEntry);
    });
};
