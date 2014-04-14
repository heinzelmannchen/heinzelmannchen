var list = require('../lib/list');

describe('list', function() {
    describe('#listGenerators', function() {
        it('should list a generator which is specified as a string (his git url)', function() {
            var config = {
                generators: {
                    pg: 'http://yourrepo.com/pg.git#1.0.1'
                }
            };

            return list.listGenerators(config).should.become('pg');
        });

        it('should list a generator which is specified as an object', function() {
            var config = {
                generators: {
                    mysql: {
                        npm: 'heinzelmannchen-gen-mysql',
                        config: {
                            user: 'user'
                        }
                    }
                }
            };

            return list.listGenerators(config).should.become('mysql');
        });

    });
});
