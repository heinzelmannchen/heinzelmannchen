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
    var domainConfig = config.get('domains.' + domain),
        generatorConfig = config.get('generators.' + domainConfig.generator).config,
        Generator = require(domainConfig.generator),
        generator = new Generator(),
        templateFile = domainConfig.template,
        output = domainConfig.output,
        data;

    generator.setConfig(generatorConfig);
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
