var sinon = require('sinon'),
    Q = require('q'),
    _ = require('underscore'),
    Search = require('../lib/search'),
    search;

describe('search', function() {
    describe('interface', function() {
        beforeEach(function() {
            search = new Search();

        });
        it('should respond to searchGenerator', function() {
            search.should.respondTo('searchGenerator');
        });
        it('should respond to searchTemplates', function() {
            search.should.respondTo('searchTemplates');
        });
        it('should respond to search', function() {
            search.should.respondTo('search');
        });
    });
    describe('#search', function() {
        it('should call npm.search with the given keywords', function() {
            var spy = sinon.spy();
            search = new Search({
                _: _,
                Q: Q,
                npm: {
                    search: spy
                }
            });
            search.search(['heinzel', 'generator']);
            spy.should.have.been.calledWith(['heinzel', 'generator']);
        });
    });
    describe('#searchTemplates', function() {
        it('should call npm.search with the given keywords prefixed with heinzelmannchen-tpl-', function() {
            var spy = sinon.spy();
            search = new Search({
                _: _,
                Q: Q,
                npm: {
                    search: spy
                }
            });
            search.searchTemplates(['formView', 'listView']);
            spy.should.have.been.calledWith(['heinzelmannchen-tpl-formView', 'heinzelmannchen-tpl-listView']);
        });
    });

    describe('#searchGenerator', function() {
        it('should call npm.search with the given keywords prefixed with heinzelmannchen-gen-', function() {
            var spy = sinon.spy();
            search = new Search({
                _: _,
                Q: Q,
                npm: {
                    search: spy
                }
            });
            search.searchGenerator(['mysql', 'pg']);
            spy.should.have.been.calledWith(['heinzelmannchen-gen-mysql', 'heinzelmannchen-gen-pg']);
        });
    });
});
