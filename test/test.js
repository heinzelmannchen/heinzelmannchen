var heinzel = require('../heinzel');

require('mocha-as-promised')();

describe('Test Travis', function() {
    describe('ShouldJs', function() {
        it('true should be true', function() {
            return true.should.be.true;
        });
        it('true should be true', function() {
            return (1).should.be.a.Number;
        });
    });
});
