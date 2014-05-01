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
    describe.skip('#create', function() {
        var configGetSpy = sinon.stub().returns({
            generator: 'myGenerator',
            template: 'myTemplate',
            output: '<%= heinzel %>.md'
        }),
            generatorCreateSpy = function() {
                var q = Q.defer();
                q.resolve({
                    heinzel: 'anton'
                });
                return q.promise;
            },
            templateSpy = function() {
                var q = Q.defer();
                q.resolve('Hello anton');
                return q.promise;
            },
            writeSpy = function(output, content, options) {
                var q = Q.defer();
                output.should.be.eql('<%= heinzel %>.md');
                content.should.be.eql('Hello anton');
                options.should.be.eql({
                    data: {
                        heinzel: 'anton'
                    },
                    force: true
                });
                q.resolve('anton.md');
                return q.promise;
            },
            create;
        beforeEach(function() {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            mockery.registerMock('myGenerator', function() {
                return {
                    setConfig: function() {},
                    createData: generatorCreateSpy
                };
            });
            create = new Create({
                config: {
                    get: configGetSpy
                },
                template: {
                    template: templateSpy,
                    templateFromNpm: templateSpy,
                    write: writeSpy
                },
                Q: Q,
                _: _
            }).create;
        });
        it('should read the config for a given domain', function() {
            var promise = create('myDomain');
            return promise.should.eventually.be.fulfilled;
        });
    });
});
