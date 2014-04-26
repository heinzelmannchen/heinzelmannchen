var pub = {},
    Q, _, config;

module.exports = function($inject){
    Q = $inject.Q;
    _ = $inject._;
    config = $inject.config;

    return pub;
};

pub.list = function(key) {
    var q = Q.defer();
    q.resolve(_.keys(config.get(key)));
    return q.promise;
};
