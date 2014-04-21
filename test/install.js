var Install = require('../lib/install'),
    sinon = require('sinon');

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
            install = new Install({
                _: require('underscore'),
                Q: require('q'),
                npm: {
                    install: installSpy
                }
            });
        });
        it('should call npm.install', function() {
            install.install('module');
            installSpy.should.have.been.calledWith('module');
        });
    });
    
    describe('#uninstall', function() {
        var uninstallSpy = sinon.spy(),
            install;
        beforeEach(function() {
            install = new Install({
                _: require('underscore'),
                Q: require('q'),
                npm: {
                    uninstall: uninstallSpy
                }
            });
        });
        it('should call npm.uninstall', function() {
            install.uninstall('module');
            uninstallSpy.should.have.been.calledWith('module');
        });
    });
});
