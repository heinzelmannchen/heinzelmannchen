var pub = {},
    _, Q, config, template;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    config = $inject.config;
    template = $inject.template;

    return pub;
};

pub.create = function(domain) {
    var domainConfig = config.get(domain),
        generator = require(domainConfig.generator),
        templateFile = domainConfig.template;

    return generator.createData()
        .then(function(data) {
            return template.template(templateFile, data);
        });
};
