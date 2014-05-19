var configStub = null,
    DEFAULT_WRITE_OPTIONS = {
        force: false,
        override: false
    },
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon'),
    Init = require('../lib/init');

_.mixin({
    hasInside: require('underscore.has-inside')
});

describe('init', function() {
    describe('#init', function() {
        var installSpy, templateSpy, writeSpy, init;
        beforeEach(function() {
            installSpy = sinon.spy();
            templateSpy = sinon.spy();
            writeSpy = sinon.spy();
            init = new Init({
                Q: Q,
                _: _,
                template: {
                    write: function(template, data) {
                        var q = Q.defer();
                        writeSpy(template, data);
                        q.resolve();
                        return q.promise;
                    },
                    templateFromNpm: function(template, data) {
                        var q = Q.defer();
                        templateSpy(template, data);
                        q.resolve('content');
                        return q.promise;
                    }
                },
                installTemplates: function(template) {
                    var q = Q.defer();
                    installSpy(template);
                    q.resolve(['default-config']);
                    return q.promise;
                },
                resolvePackageNameFromUrl: function() {return arguments;}
            });
        });

        it('should install a default config', function() {
            return init.init('default-config')
                .then(function() {
                    return installSpy.should.have.been.calledWith('default-config');
                });
        });

        it('should process the default config template', function() {
            return init.init('default-config', 'heinzelrc.tpl', {})
                .then(function() {
                    return templateSpy.should.have.been.calledWith('default-config/heinzelrc.tpl', { data: {}});
                });
        });

        it('should write the config to ./.heinzelrc', function() {
            return init.init('default-config', 'heinzelrc.tpl', {})
                .then(function() {
                    return writeSpy.should.have.been.calledWith('.heinzelrc', 'content');
                });
        });
    });
});