var pub = {},
    TEMPLATE = 'template',
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
    // TODO cascade generators...
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
        templateFile = domainConfig.template,
        output = domainConfig.output;

    generator.setConfig(generatorConfig);
    return generator.createData()
        .then(function(data) {
            var funcs = _.flatten(_.map(data, function(element) {
                return [getTemplateFunction(templateFile, element), getWriteFunction(output, element, options)];
            }));
            return funcs.reduce(Q.when, Q(null));
        });
}

function getTemplateFunction(templateFile, element) {
    return function() {
        return template.templateFromNpm(templateFile, element);
    };
}

function getWriteFunction(output, element, options) {
    return function(fileContent) {
        var writeOptions = _.extend({
            data: element,
            force: false,
            override: false
        }, options);
        return template.write(output, fileContent, writeOptions);
    };
}

function getDomainConfig(domain) {
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
