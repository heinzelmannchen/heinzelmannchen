var pub = {},
    TEMPLATE = 'template',
    DEFAULT_WRITE_OPTIONS = {
        force: false,
        override: false
    },
    _, Q, config, template, promises, options;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    config = $inject.config;
    template = $inject.template;

    if (template) {
        pub.templateFromNpm = template.templateFromNpm;
        pub.write = template.write;
    }
    return pub;
};

pub.create = function(domain, theOptions) {
    var child;
    options = theOptions;

    promises = promises ||  [];
    if (isDomain(domain)) {
        return create(getDomainConfig(domain));
    } else {
        child = config.get('domains.' + domain);
        promises = findDomains(domain, child);
    }
    return Q.all(promises).then(function(result) {
        var first = _.first(result);
        if (_.isArray(first)) {
            return _.chain(result).flatten().compact().value();
        } else {
            if (first && first.value) {
                return _.first(result).value;
            } else {
                return _.chain(result).flatten().compact().value();
            }
        }
    });
};


function findDomains(domainName, domain) {
    return _.map(domain, function(element, index) {
        if (isDomain(domainName + '.' + index)) {
            return pub.create(domainName + '.' + index, options);
        }
    });
}

function create(domainConfig) {
    var result = [],
        generatorConfig, generator;
    if (domainConfig.generator) {
        generatorConfig = getGeneratorConfig(domainConfig.generator, domainConfig);
        generator = getGenerator(domainConfig.generator);
        generator.setConfig(generatorConfig);
        if (options && options.filters) {
            generator.setFilters(options.filters);
        }
    } else {
        if (!domainConfig.data) {
            throw new Error('Provide a generator or data');
        }
        generator = {
            createData: function() {
                var q = Q.defer();
                q.resolve([{}]);
                return q.promise;
            }
        };
    }

    return generator.createData()
        .then(function(data) {
            return _.chain(data)
                .map(function(element) {
                    var sequence = [];
                    element = _.extend(element, domainConfig.data || {});
                    sequence[0] = getTemplateFunction(domainConfig.template, domainConfig.delimiter, element);
                    sequence[1] = getWriteFunction(domainConfig.output, element, result);
                    return sequence;
                })
                .flatten()
                .value()
                .reduce(Q.when, Q());
        });
}

function getTemplateFunction(templateFile, delimiter, element) {
    return function() {
        if (options && options.delimiter) {
            template.setDelimiter(options.delimiter.start, options.delimiter.end);
        } else if (delimiter) {
            delimiter = delimiter.split(' ');
            delimiter = {
                start: delimiter[0],
                end: delimiter[1]
            };
            template.setDelimiter(delimiter.start, delimiter.end);
        }
        return template.templateFromNpm(templateFile, element);
    };
}

function getWriteFunction(output, element, result) {
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
    var domainObject = config.get('domains.' + domain);
    if (!domainObject.output) {
        domainObject.output = config.get('domains.' + domain + '.output');
    }
    if (!domainObject.delimiter) {
        try {
            domainObject.delimiter = config.get('domains.' + domain + '.delimiter');
        } catch (error) {}
    }
    if (!domainObject.generator) {
        try {
            domainObject.generator = config.get('domains.' + domain + '.generator');
        } catch (error) {}
    }
    if (!domainObject.data) {
        try {
            domainObject.data = config.get('domains.' + domain + '.data');
        } catch (error) {}
    }
    return domainObject;
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
    try {
        config.get('domains.' + domain + '.' + TEMPLATE);
        return true;
    } catch (error) {
        return false;
    }
}
