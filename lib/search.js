var pub = {},
    TEMPLATE_PREFIX = 'heinzelmannchen-tpl-',
    GENERATOR_PREFIX = 'heinzelmannchen-gen-',
    _, Q, npm;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    npm = $inject.npm;

    return pub;
};

pub.searchGenerator = function(generators) {
    generators = _.map(generators, addPrefix(GENERATOR_PREFIX));
    return pub.search(generators);
};

pub.searchTemplates = function(templates) {
    templates = _.map(templates, addPrefix(TEMPLATE_PREFIX));
    return pub.search(templates);
};

pub.search = function(keywords) {
    return npm.search(keywords);
};

function addPrefix(prefix) {
    return function(value) {
        return prefix + value;
    };
}
