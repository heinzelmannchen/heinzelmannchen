﻿var configStub = null,
    list = require('../lib/list')({
        Q: require('q'),
        _: require('underscore'),
        config: {
            get: function() {
                return configStub;
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

                return list.list('generators').should.become(['pg']);
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

                return list.list('generators').should.become(['mysql']);
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

                return list.list('generators').should.become(['mysql', 'pg', 'inline', 'json']);
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

                return list.list('templates').should.become(['formView', 'listView', 'listController', 'listBackend']);
            });
        });

        describe('domains', function() {
            it('should list multiple domains', function() {
                configStub = {
                    extViews: {
                        formView: {},
                        listView: {},
                        generator: 'inline'
                    },
                    backend: {
                        service: {},
                        dal: {},
                        generator: 'inline'
                    }
                };

                return list.list('domains').should.become(['extViews', 'backend']);
            });
        });
    });
});
