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

_.extend(pub, new Search(_.extend(dependancies, {
    npm: heinzelNpm
})));

_.extend(pub, new Install(_.extend(dependancies, {
    Q: Q,
    _: _,
    npm: heinzelNpm
})));

_.extend(pub, new Create(_.extend(dependancies, {
    template: heinzelTemplate,
    config: heinzelConfig
})));
