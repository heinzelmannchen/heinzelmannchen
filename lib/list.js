var Q,
    pub = {};

module.exports = function($inject){
    Q = $inject.Q;

    return pub;
};

pub.get = function(config) {
    var q = Q.defer();
    q.resolve(Object.keys(config));
    return q.promise;
};
