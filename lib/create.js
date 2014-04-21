var pub = {},
    _, Q, config, template, promises;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    config = $inject.config;
    template = $inject.template;

    return pub;
};

pub.create = function(domain, options) {
    // TODO cascade generators...
    domain = (_.isObject(domain)) ? domain : getDomainConfig(domain);
    if (!promises) {
        promises = [];
    }
    if (_.has(domain, 'template')) {
        return create(domain, options);
    } else {
        _.each(domain, function(element, index) {
            if (!_.contains(['generator', 'template', 'output'], index)) {
                promises.push(pub.create(element, options));
            }
        });
    }
    return Q.allSettled(promises);
};

function create(domainConfig, options) {
    var generatorConfig = getGeneratorConfig(domainConfig.generator, domainConfig),
        generator = getGenerator(domainConfig.generator),
        templateFile = domainConfig.template,
        output = domainConfig.output,
        data;

    generator.setConfig(generatorConfig);
    return generator.createData()
        .then(function(processedData) {
            // TODO foreach
            data = processedData[0];
            return template.templateFromNpm(templateFile, data);
        })
        .then(function(fileContent) {
            options = _.extend({
                data: data,
                force: true
            }, options);
            return template.write(output, fileContent, options);
        });
}

function getDomainConfig(domain) {
    return config.get('domains.' + domain);
}

function getGeneratorConfig(generator, domainConfig) {
    var generatorName = getGeneratorName(generator),
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
    var generatorName = getGeneratorName(generator),
        Generator = require(generatorName);
    return new Generator();
}

function getGeneratorName(generator) {
    return (_.isObject(generator)) ? generator.name : generator;
}
