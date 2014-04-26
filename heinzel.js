var pub = module.exports,
    Q = require('q'),
    _ = require('underscore'),
    heinzelNpm = require('heinzelmannchen-npm'),
    heinzelConfig = require('heinzelmannchen-config'),
    heinzelTemplate = require('heinzelmannchen-template'),
    Search = require('./lib/search'),
    Install = require('./lib/install'),
    Create = require('./lib/create'),
    dependancies = {
        Q: Q,
        _: _
    };

mixin(Search, {
    npm: heinzelNpm
});

mixin(Install, {
    npm: heinzelNpm
});

mixin(Create, {
    template: heinzelTemplate,
    config: heinzelConfig
});


function mixin(klass, additionalDependancies) {
    _.extend(pub, klass(_.extend(dependancies, additionalDependancies)));
}
