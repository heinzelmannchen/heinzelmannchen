var pub = {},
    _, Q, npm;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    npm = $inject.npm;

    return pub;
};

pub.install = function(package) {
    return npm.install(package);
};

pub.uninstall = function(package) {
    return npm.uninstall(package);
};
