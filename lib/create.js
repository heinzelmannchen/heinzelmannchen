var pub = {},
    TEMPLATE = 'template',
    DEFAULT_WRITE_OPTIONS = {
        force: false,
        override: false
    },
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
    promises = promises ||  [];
    domain = getDomainConfig(domain);
    if (isDomain(domain)) {
        return create(domain, options);
    } else {
        _.each(domain, function(element, index) {
            if (isDomain(element)) {
                promises.push(pub.create(element, options));
            }
        });
    }
    return Q.allSettled(promises);
};

function create(domainConfig, options) {
    var generatorConfig = getGeneratorConfig(domainConfig.generator, domainConfig),
        generator = getGenerator(domainConfig.generator),
        result = [];

    generator.setConfig(generatorConfig);
    return generator.createData()
        .then(function(data) {
            return _.chain(data)
                .map(function(element) {
                    var sequence = [];
                    sequence[0] = getTemplateFunction(domainConfig.template, element);
                    sequence[1] = getWriteFunction(domainConfig.output, element, options, result);
                    return sequence;
                })
                .flatten()
                .value()
                .reduce(Q.when, Q());
        });
}

function getTemplateFunction(templateFile, element) {
    return function() {
        return template.templateFromNpm(templateFile, element);
    };
}

function getWriteFunction(output, element, options, result) {
    return function(fileContent) {
        var writeOptions = _.extend(DEFAULT_WRITE_OPTIONS, options);
        writeOptions.data = element;
        return template.write(output, fileContent, writeOptions)
            .then(function(fileName) {
                result.push(fileName);
                return result;
            });
    };
}

function getDomainConfig(domain) {
    // TODO cascade generators...
    // get parent config if not set generator, output
    return (_.isObject(domain)) ? domain : config.get('domains.' + domain);
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

function isDomain(domain) {
    return _.has(domain, TEMPLATE);
}
