var pub = module.exports,
    Q = require('q'),
    _ = require('underscore'),
    heinzelNpm = require('heinzelmannchen-npm'),
    heinzelConfig = require('heinzelmannchen-config'),
    heinzelTemplate = require('heinzelmannchen-template'),
    mixin = require('./lib/mixin'),
    Search = require('./lib/search'),
    Install = require('./lib/install'),
    Create = require('./lib/create');

pub.mixin = mixin({
    Q: Q,
    _: _
});

pub.mixin(Search)
    .inject({
        npm: heinzelNpm
    });

pub.mixin(Install)
    .inject({
        npm: heinzelNpm
    });

pub.mixin(Create)
    .inject({
        template: heinzelTemplate,
        config: heinzelConfig
    });
