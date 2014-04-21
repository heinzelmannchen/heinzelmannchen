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

pub.create = function(domain, options) {
    var domainConfig = config.get(domain),
        generator = require(domainConfig.generator),
        templateFile = domainConfig.template,
        output = domainConfig.output,
        data;

    return generator.createData()
        .then(function(processedData) {
            data = processedData;
            return template.template(templateFile, data);
        })
        .then(function(fileContent) {
            options = _.extend({
                data: data,
                force: true
            }, options);
            return template.write(output, fileContent, options);
        });
};
