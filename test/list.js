var list = require('../lib/list');

describe('list', function() {
    describe('#list', function() {
        describe('generators', function() {
            it('should list a generator which is specified as a string (his git url)', function() {
                var generators = {
                        pg: 'http://yourrepo.com/pg.git#1.0.1'
                    };

                return list.get(generators).should.become(['pg']);
            });

            it('should list a generator which is specified as an object', function() {
                var generators = {
                        mysql: {
                            npm: 'heinzelmannchen-gen-mysql',
                            config: {
                                user: 'user'
                            }
                        }
                    };

                return list.get(generators).should.become(['mysql']);
            });

            it('should list multiple generators (specified as objects or strings)', function() {
                var generators = {
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

                return list.get(generators).should.become(['mysql', 'pg', 'inline', 'json']);
            });
        });

        describe('templates', function() {
            it('should list multiple templates', function() {
                var templates = {
                        formView: 'http://yourrepo.com/formView.git#1.0.1',
                        listView: 'http://yourrepo.com/listView.git#2.0.1',
                        listController: 'http://yourrepo.com/listController.git#3.0.1',
                        listBackend: 'http://yourrepo.com/listBackend.git#4.0.1'
                    };

                return list.get(templates).should.become(['formView', 'listView', 'listController', 'listBackend']);
            });
        });

        describe('domains', function() {
            it('should list multiple domains', function() {
                var domains =  {
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

                return list.get(domains).should.become(['extViews', 'backend']);
            });
        });
    });
});
