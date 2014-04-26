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

mixin(Search)
    .inject({
        npm: heinzelNpm
    });

mixin(Install)
    .inject({
        npm: heinzelNpm
    });

mixin(Create)
    .inject({
        template: heinzelTemplate,
        config: heinzelConfig
    });


function mixin(klass) {
    return {
        inject: function(additionalDependancies) {
            _.extend(pub, klass(_.extend(dependancies, additionalDependancies)));
        }
    };
}
