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
    var domainConfig = getDomainConfig(domain),
        generatorConfig = getGeneratorConfig(domainConfig.generator, domainConfig),
        generator = getGenerator(domainConfig.generator),
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

function getDomainConfig(domain) {
    return config.get('domains.' + domain);
}

function getGeneratorConfig(generator, domainConfig) {
    var generatorName = (_.isObject(generator)) ? generator.name : generator,
        global = config.get('generators.' + generatorName).config,
        local;
    if (_.isObject(generator)) {
        local = domainConfig.generator.config;
        return _.extend(global, local);
    } else {
        return global;
    }
}

function getGenerator(generator) {
    var generatorName = (_.isObject(generator)) ? generator.name : generator,
        Generator = require(generatorName);
    return new Generator();
}
