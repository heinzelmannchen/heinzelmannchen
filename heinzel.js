var pub = module.exports,
    Q = require('q'),
    _ = require('underscore'),
    heinzelNpm = require('heinzelmannchen-npm'),
    Search = require('./lib/search'),
    Install = require('./lib/install');

_.extend(pub, new Search({
    Q: Q,
    _: _,
    npm: heinzelNpm
}));

_.extend(pub, new Install({
    Q: Q,
    _: _,
    npm: heinzelNpm
}));
