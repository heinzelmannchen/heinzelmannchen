﻿var pub = {},
    Q, _, config;

module.exports = function($inject) {
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
    var q = Q.defer(),
        key = 'domains',
        domains;

    try {
        domains = config.get(key);
        domains = _.flatten(getDomains(domains, []));
        domains = _.compact(domains);
        q.resolve(domains);
    } catch (error) {
        q.reject(error);
    }
    return q.promise;
};

function getDomains(domains, keys, parentKey) {
    return _.map(domains, function(domain, key) {
        if (domain.template) {
            return [key];
        } else {
            if (_.isObject(domain) && _.hasInside(domain, 'template')) {
                return [key, _.chain(getDomains(domain)).compact().map(function(k) {
                    return key + '.' + k;
                }).value()];
            }
        }
    });
}

function list(key) {
    var q = Q.defer();
    try {
        q.resolve(_.keys(config.get(key)));
    } catch (error) {
        q.reject(error);
    }
    return q.promise;
}
