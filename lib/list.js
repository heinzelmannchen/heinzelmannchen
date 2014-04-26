var pub = {},
    Q, _, config;

module.exports = function($inject){
    Q = $inject.Q;
    _ = $inject._;
    config = $inject.config;

    return pub;
};

pub.listGenerators = function() {
    return list('generators');
};

pub.listTemplates = function() {
    return list('templates');
};

pub.listDomains = function() {
    return list('domains');
};

function list(key) {
    var q = Q.defer();
    q.resolve(_.keys(config.get(key)));
    return q.promise;
}
