var pub = {},
    _, Q, installTemplates, template, resolvePackageNameFromUrl, ask;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    ask = $inject.ask;
    installTemplates = $inject.installTemplates;
    resolvePackageNameFromUrl = $inject.resolvePackageNameFromUrl;
    template = $inject.template;

    return pub;
};

pub.init = function(templateRepo, templateFile, data) {
    return installTemplates(templateRepo)
        .then(function(templateModule) {
            templateModule = resolvePackageNameFromUrl(templateModule);
            if (_.isString(data)) {
                ask = new ask();
                ask.setConfig(require(templateModule[0] + '/' + data));
                return ask.createData().then(function(answers) {
                    var data = {};
                    answers = answers[0];
                    _.each(answers, function(element, key) {
                        var values = _.map(element.split(','), function(value) {
                            return value.trim();
                        });
                        data[key] = values;
                    });
                    return template.templateFromNpm(templateModule[0] + '/' + templateFile, data);
                });
            }
            return template.templateFromNpm(templateModule[0] + '/' + templateFile, data);
        })
        .then(function(content) {
            return template.write('.heinzelrc', content);
        });
};
