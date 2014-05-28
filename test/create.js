var Create = require('../lib/create'),
    mockery = require('mockery'),
    sinon = require('sinon'),
    Q = require('q'),
    _ = require('underscore');

describe('create', function() {
    describe('interface', function() {
        var create;
        beforeEach(function() {
            create = new Create();
        });
        it('should respond to create', function() {
            create.should.respondTo('create');
        });
    });
});
