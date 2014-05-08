var configStub = null,
    list = require('../lib/list')({
        Q: require('q'),
        _: require('underscore'),
        config: {
            get: function() {
                if (configStub) {
                    return configStub;
                } else {
                    throw new Error();
                }
            }
        }
    });

describe('list', function() {
    describe('#list', function() {
        describe('generators', function() {
            it('should list a generator which is specified as a string (his git url)', function() {
                configStub = {
                    pg: 'http://yourrepo.com/pg.git#1.0.1'
                };

                return list.listGenerators().should.become(['pg']);
            });

            it('should throw an error if the config is not present', function() {
                configStub = null;

                return list.listGenerators().should.eventually.be.rejected;
            });

            it('should list a generator which is specified as an object', function() {
                configStub = {
                    mysql: {
                        npm: 'heinzelmannchen-gen-mysql',
                        config: {
                            user: 'user'
                        }
                    }
                };

                return list.listGenerators().should.become(['mysql']);
            });

            it('should list multiple generators (specified as objects or strings)', function() {
                configStub = {
                    mysql: {
                        npm: 'heinzelmannchen-gen-mysql',
                        config: {
                            user: 'user'
                        }
                    },
                    pg: 'http://yourrepo.com/pg.git#1.0.1',
                    inline: {
                        test: 'test'
                    },
                    json: '...'
                };

                return list.listGenerators().should.become(['mysql', 'pg', 'inline', 'json']);
            });
        });

        describe('templates', function() {
            it('should list multiple templates', function() {
                configStub = {
                    formView: 'http://yourrepo.com/formView.git#1.0.1',
                    listView: 'http://yourrepo.com/listView.git#2.0.1',
                    listController: 'http://yourrepo.com/listController.git#3.0.1',
                    listBackend: 'http://yourrepo.com/listBackend.git#4.0.1'
                };

                return list.listTemplates().should.become(['formView', 'listView', 'listController', 'listBackend']);
            });
        });

        describe('domains', function() {
            it('should list multiple domains', function() {
                configStub = {
                    extViews: {
                        formView: {
                            template: 'foo'
                        },
                        listView: {
                            template: 'bar'
                        },
                        generator: 'inline'
                    },
                    backend: {
                        service: {
                            template: 'bar'
                        },
                        dal: {},
                        generator: 'inline'
                    }
                };

                return list.listDomains().should.eventually.be.like(['extViews','extViews.formView', 'extViews.listView', 'backend', 'backend.service']);
            });
        });
    });
});
