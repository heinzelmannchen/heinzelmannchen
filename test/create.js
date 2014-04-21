var Create = require('../lib/create'),
    mockery = require('mockery'),
    sinon = require('sinon'),
    Q = require('q');

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
    describe('#create', function() {
        var configGetSpy = sinon.stub().returns({
            generator: 'myGenerator'
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
            create;
        beforeEach(function() {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            mockery.registerMock('myGenerator', {
                createData: generatorCreateSpy
            });
            create = new Create({
                config: {
                    get: configGetSpy
                },
                template: {
                    template: templateSpy
                },
                Q: Q
            }).create;
        });
        it('should read the config for a given domain', function() {
            var promise = create('myDomain');
            configGetSpy.should.have.been.calledWith('myDomain');
            return promise.should.eventually.become('Hello anton');
        });
    });
});
