var pub = module.exports,
    Q = require('q'),
    _ = require('underscore'),
    heinzelNpm = require('heinzelmannchen-npm'),
    heinzelConfig = require('heinzelmannchen-config'),
    heinzelTemplate = require('heinzelmannchen-template'),
    mixin = require('./lib/mixin'),
    prefix = require('./lib/prefix'),
    Search = require('./lib/search'),
    Explain = require('./lib/explain'),
    List = require('./lib/list'),
    Install = require('./lib/install'),
    Create = require('./lib/create'),
    RequireHelper = require('./lib/helper/require'),
    MINIMAL_DEPENDANCIES = {
        Q: Q,
        _: _
    };

_.str = require('underscore.string');
_.mixin(_.str.exports());
_.mixin({
    hasInside: require('underscore.has-inside')
});

pub.mixin = mixin(MINIMAL_DEPENDANCIES);

pub.mixin(Explain)
    .inject({
        requireHelper: new RequireHelper(MINIMAL_DEPENDANCIES)
    });

pub.mixin(Search)
    .inject({
        npm: heinzelNpm
    });

pub.mixin(List)
    .inject({
        config: heinzelConfig
    });

pub.mixin(Install)
    .inject({
        npm: heinzelNpm,
        prefix: prefix,
        config: heinzelConfig
    });

pub.mixin(Create)
    .inject({
        template: heinzelTemplate,
        config: heinzelConfig
    });
