var search = require('../lib/search')({
    _ : require('underscore')
});

describe('search', function() {
    describe('interface', function() {
        it('should respond to searchGenerator', function() {
            search.should.respondTo('searchGenerator');
        });
    });
});
