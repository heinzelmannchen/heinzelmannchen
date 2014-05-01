var Install = require('../lib/install'),
    sinon = require('sinon'),
    Q = require('q'),
    _ = require('underscore'),
    injections = {
        _: _,
        Q: Q,
        prefix: require('../lib/prefix')
    },
    RequireHelper = require('../lib/helper/require');

describe('install', function() {
    describe('interface', function() {
        var install;
        beforeEach(function() {
            install = new Install();
        });
        it('should respond to install', function() {
            install.should.respondTo('install');
        });
        it('should respond to uninstall', function() {
            install.should.respondTo('uninstall');
        });
    });
    
    describe('#install', function() {
        var installSpy = sinon.spy(),
            install;
        beforeEach(function() {
            install = new Install(_.extend(injections, {
                npm: {
                    install: installSpy
                }
            }));
        });
        it('should call npm.install', function() {
            install.install('module');
            installSpy.should.have.been.calledWith('module');
        });
    });

    describe('#installGenerators', function () {
        var install,
            installSpy = sinon.stub().returns((function() {
            var q = Q.defer();
            q.resolve();
            return q.promise;
        }()));
        beforeEach(function () {
            install = new Install(_.extend(injections, {
                npm: {
                    install: installSpy
                },
                requireHelper: new RequireHelper(injections)
            }));
        });
        it('should call npm.install with the generator prefix', function () {
            install.installGenerators('module');
            installSpy.should.have.been.calledWith(['heinzelmannchen-gen-module']);
        });

        it('should call npm.install with the generator prefix for multiple generators', function () {
            install.installGenerators(['module1', 'module2', 'module3']);
            installSpy.should.have.been.calledWith(['heinzelmannchen-gen-module1', 'heinzelmannchen-gen-module2', 'heinzelmannchen-gen-module3']);
        });
    });

    describe('#installTemplates', function () {
        var install,
            installSpy = sinon.stub().returns((function() {
                var q = Q.defer();
                q.resolve();
                return q.promise;
            }()));
        beforeEach(function () {
            install = new Install(_.extend(injections, {
                npm: {
                    install: installSpy
                },
                requireHelper: new RequireHelper(injections)
            }));
        });
        it('should call npm.install with the template prefix', function () {
            install.installTemplates('module');
            installSpy.should.have.been.calledWith(['heinzelmannchen-tpl-module']);
        });

        it('should call npm.install with the template prefix for multiple templates', function () {
            install.installTemplates(['module1', 'module2', 'module3']);
            installSpy.should.have.been.calledWith(['heinzelmannchen-tpl-module1', 'heinzelmannchen-tpl-module2', 'heinzelmannchen-tpl-module3']);
        });
    });
    
    describe('#uninstall', function() {
        var uninstallSpy = sinon.spy(),
            install;
        beforeEach(function() {
            install = new Install(_.extend(injections, {
                npm: {
                    uninstall: uninstallSpy
                }
            }));
        });
        it('should call npm.uninstall', function() {
            install.uninstall('module');
            uninstallSpy.should.have.been.calledWith('module');
        });
    });
});
