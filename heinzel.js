var me = module.exports,
    Q = require('q'),
    _ = require('underscore'),
    heinzelNpm = require('heinzelmannchen-npm'),
    search = require('./lib/search')({
        Q: Q,
        _: _,
        npm: heinzelNpm
    });

me.search = search.search;
