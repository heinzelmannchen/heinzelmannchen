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
            installStub = createSinonStubPromise(),
            configStub = createSinonStubPromise();

        beforeEach(function () {
            install = new Install(_.extend(injections, {
                npm: {
                    install: installStub
                },
                requireHelper: new RequireHelper(injections),
                config: {
                    saveLocal: configStub
                }
            }));
        });
        it('should call npm.install with the generator prefix', function () {
            install.installGenerators('module');
            installStub.should.have.been.calledWith(['heinzelmannchen-gen-module']);
        });

        it('should call npm.install with the generator prefix for multiple generators', function () {
            install.installGenerators(['module1', 'module2', 'module3']);
            installStub.should.have.been.calledWith(['heinzelmannchen-gen-module1', 'heinzelmannchen-gen-module2', 'heinzelmannchen-gen-module3']);
        });

        it('shouldn\'t call heinzel config if no save flag is used', function () {
            return install.installGenerators('module').then(function () {
                return configStub.should.not.have.been.called;
            });
        });

        it('should call heinzel config with the generator string', function () {
            return install.installGenerators('module', { saveInConfig: true }).then(function () {
                return configStub.should.have.been.calledWith('generators.heinzelmannchen-gen-module');
            });
        });
    });

    describe('#installTemplates', function () {
        var install,
            installStub = createSinonStubPromise(),
            configStub = createSinonStubPromise();

        beforeEach(function () {
            install = new Install(_.extend(injections, {
                npm: {
                    install: installStub
                },
                requireHelper: new RequireHelper(injections),
                config: {
                    saveLocal: configStub
                }
            }));
        });
        it('should call npm.install with the template prefix', function () {
            install.installTemplates('module');
            installStub.should.have.been.calledWith(['heinzelmannchen-tpl-module']);
        });

        it('should call npm.install with the template prefix for multiple templates', function () {
            install.installTemplates(['module1', 'module2', 'module3']);
            installStub.should.have.been.calledWith(['heinzelmannchen-tpl-module1', 'heinzelmannchen-tpl-module2', 'heinzelmannchen-tpl-module3']);
        });

        it('shouldn\'t call heinzel config if no save-flag is used', function () {
            return install.installTemplates('module').then(function () {
                return configStub.should.not.have.been.called;
            });
        });

        it('should call heinzel config with the template string', function () {
            return install.installTemplates(['module'], { saveInConfig: true }).then(function () {
                return configStub.should.have.been.calledWith('templates.heinzelmannchen-tpl-module');
            });
        });

        it('should call npm.install without a prefix if it\'s an url', function () {
            var urls = ['http://github.com/heinzelmannchen/module1.git',
                        'https://github.com/heinzelmannchen/module2.git',
                        'http://github.com/heinzelmannchen/module3',
                        'https://github.com/heinzelmannchen/module4',
                        'git://github.com/heinzelmannchen/module5'];
            install.installTemplates(urls);
            installStub.should.have.been.calledWith(urls);
        });

        it('should call heinzel config with the repository name if it\'s an url or packagename', function () {
            var packages = ['http://github.com/heinzelmannchen/module1.git',
                            'https://github.com/heinzelmannchen/module2',
                            'module3',
                            'git://github.com/heinzelmannchen/module4',
                            'http://github.com/heinzelmannchen/heinzel-tpl-foo.git#0.1.1/myfoo.tpl'],
				options = { saveInConfig: true };
				
            return install.installTemplates(packages, options).then(function () {
                return configStub.should.have.been.calledWith('templates.module1', 'http://github.com/heinzelmannchen/module1.git') &&
                       configStub.should.have.been.calledWith('templates.module2', 'https://github.com/heinzelmannchen/module2') &&
                       configStub.should.have.been.calledWith('templates.heinzelmannchen-tpl-module3', 'heinzelmannchen-tpl-module3') &&
                       configStub.should.have.been.calledWith('templates.module4', 'git://github.com/heinzelmannchen/module4');
            });
        });
    });
    
    describe('uninstall', function() {
        var install,
            uninstallStub = createSinonStubPromise(),
            configStub = createSinonStubPromise();

        beforeEach(function() {
            install = new Install(_.extend(injections, {
                npm: {
                    uninstall: uninstallStub
                },
                requireHelper: new RequireHelper(injections),
                config: {
                    removeLocal: configStub
                }
            }));
        });
        it('should call npm.uninstall', function() {
            install.uninstall('module');
            uninstallStub.should.have.been.calledWith('module');
        });

        it('should call npm.uninstall with the template prefix', function () {
            install.uninstallTemplates('module');
            uninstallStub.should.have.been.calledWith(['heinzelmannchen-tpl-module']);
        });

        it('should call npm.uninstall with the generator prefix', function () {
            install.uninstallGenerators('module');
            uninstallStub.should.have.been.calledWith(['heinzelmannchen-gen-module']);
        });

        it('should call npm.uninstall with the template prefix for multiple templates', function () {
            install.uninstallTemplates(['module1', 'module2', 'module3']);
            uninstallStub.should.have.been.calledWith(['heinzelmannchen-tpl-module1', 'heinzelmannchen-tpl-module2', 'heinzelmannchen-tpl-module3']);
        });

        it('should call npm.uninstall with the generator prefix for multiple generators', function () {
            install.uninstallGenerators(['module1', 'module2', 'module3']);
            uninstallStub.should.have.been.calledWith(['heinzelmannchen-gen-module1', 'heinzelmannchen-gen-module2', 'heinzelmannchen-gen-module3']);
        });

        it('should call npm.uninstall without a prefix if it\'s an url', function () {
            var urls = ['http://github.com/heinzelmannchen/module1.git',
                        'https://github.com/heinzelmannchen/module2.git',
                        'http://github.com/heinzelmannchen/module3',
                        'https://github.com/heinzelmannchen/module4',
                        'git://github.com/heinzelmannchen/module5'];
            install.uninstallTemplates(urls);
            uninstallStub.should.have.been.calledWith(urls);
        });

        it('should call heinzel config with the repository name if it\'s an url or packagename', function () {
            var packages = ['http://github.com/heinzelmannchen/module1.git',
                            'https://github.com/heinzelmannchen/module2',
                            'module3',
                            'git://github.com/heinzelmannchen/module4',
                            'http://github.com/heinzelmannchen/heinzel-tpl-foo.git#0.1.1/myfoo.tpl'];
            return install.uninstallTemplates(packages, true).then(function () {
                return configStub.should.have.been.calledWith('templates.module1', 'http://github.com/heinzelmannchen/module1.git') &&
                       configStub.should.have.been.calledWith('templates.module2', 'https://github.com/heinzelmannchen/module2') &&
                       configStub.should.have.been.calledWith('templates.heinzelmannchen-tpl-module3', 'heinzelmannchen-tpl-module3') &&
                       configStub.should.have.been.calledWith('templates.module4', 'git://github.com/heinzelmannchen/module4');
            });
        });
    });

    describe('update', function () {
        var install,
            updateSpy = createSinonStubPromise();
            
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

function createSinonStubPromise(){
    return sinon.stub().returns((function () {
        var q = Q.defer();
        q.resolve();
        return q.promise;
    }()));
}