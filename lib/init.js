var pub = {},
    _, Q, installTemplates, template, resolvePackageNameFromUrl;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    installTemplates = $inject.installTemplates;
    resolvePackageNameFromUrl = $inject.resolvePackageNameFromUrl;
    template = $inject.template;

    return pub;
};

pub.init = function(templateRepo, templateFile, data) {
    return installTemplates(templateRepo)
        .then(function(templateModule) {
            templateModule = resolvePackageNameFromUrl(templateModule);
            return template.templateFromNpm(templateModule[0] + '/' + templateFile, {data: data});
        })
        .then(function(content) {
            return template.write('.heinzelrc', content);
        });
};
