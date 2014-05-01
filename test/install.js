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
            install.should.respondTo('installGenerators');
            install.should.respondTo('installTemplates');
        });
        it('should respond to uninstall', function() {
            install.should.respondTo('uninstall');
            install.should.respondTo('uninstallGenerators');
            install.should.respondTo('uninstallTemplates');
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
    
    describe('uninstall', function() {
        var install,
            uninstallSpy = sinon.stub().returns((function () {
                var q = Q.defer();
                q.resolve();
                return q.promise;
            }()));
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

        it('should call npm.uninstall with the template prefix', function () {
            install.uninstallTemplates('module');
            uninstallSpy.should.have.been.calledWith(['heinzelmannchen-tpl-module']);
        });

        it('should call npm.uninstall with the generator prefix', function () {
            install.uninstallGenerators('module');
            uninstallSpy.should.have.been.calledWith(['heinzelmannchen-gen-module']);
        });

        it('should call npm.uninstall with the template prefix for multiple templates', function () {
            install.uninstallTemplates(['module1', 'module2', 'module3']);
            uninstallSpy.should.have.been.calledWith(['heinzelmannchen-tpl-module1', 'heinzelmannchen-tpl-module2', 'heinzelmannchen-tpl-module3']);
        });

        it('should call npm.uninstall with the generator prefix for multiple generators', function () {
            install.uninstallGenerators(['module1', 'module2', 'module3']);
            uninstallSpy.should.have.been.calledWith(['heinzelmannchen-gen-module1', 'heinzelmannchen-gen-module2', 'heinzelmannchen-gen-module3']);
        });
    });

    describe('update', function () {
        var install,
            updateSpy = sinon.stub().returns((function () {
                var q = Q.defer();
                q.resolve();
                return q.promise;
            }()));
            
        beforeEach(function () {
            install = new Install(_.extend(injections, {
                npm: {
                    update: updateSpy
                }
            }));
        });
        it('should call npm.update', function () {
            install.update('module');
            updateSpy.should.have.been.calledWith('module');
        });

        it('should call npm.update without keywords', function () {
            install.update('module');
            updateSpy.should.have.been.calledWith();
        });

        it('should call npm.update with the generator prefix', function () {
            install.updateGenerators('module');
            updateSpy.should.have.been.calledWith(['heinzelmannchen-gen-module']);
        });

        it('should call npm.update with the template prefix for multiple templates', function () {
            install.updateTemplates(['module1', 'module2', 'module3']);
            updateSpy.should.have.been.calledWith(['heinzelmannchen-tpl-module1', 'heinzelmannchen-tpl-module2', 'heinzelmannchen-tpl-module3']);
        });

        it('should call npm.update with the generator prefix for multiple generators', function () {
            install.updateGenerators(['module1', 'module2', 'module3']);
            updateSpy.should.have.been.calledWith(['heinzelmannchen-gen-module1', 'heinzelmannchen-gen-module2', 'heinzelmannchen-gen-module3']);
        });

    });
});
