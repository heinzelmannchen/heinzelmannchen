var pub = {},
    _, Q, install, template;

module.exports = function($inject) {
    $inject = $inject ||  {};
    _ = $inject._;
    Q = $inject.Q;
    install = $inject.install;
    template = $inject.template;

    return pub;
};

pub.init = function(templateRepo, templateFile, data) {
    return install.installTemplates(templateRepo)
        .then(function(templateModule) {
            return template.templateFromNpm(templateModule[0] + '/' + templateFile, data);
        });
};
