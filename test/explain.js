var sinon = require('sinon'),
    Q = require('q'),
    _ = require('underscore'),
    mockery = require('mockery'),
    Explain = require('../lib/explain'),
    explain;

_.str = require('underscore.string');
_.mixin(_.str.exports());

describe('explain', function() {
    describe('#explain', function() {
        beforeEach(function() {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            mockery.registerMock('heinzelmannchen-gen-dalek', {
                explain: function() {
                    return 'Dalek says: EXPLAIN';
                }
            });
        });

        afterEach(function() {
            mockery.disable();
        });

        it('should return a explanation of the generator', function() {
            var explain = new Explain({
                Q: Q,
                _: _,
                requireHelper: require('../lib/helper/require')({
                    _: _,
                    Q: Q
                })
            });
            return explain.explain('dalek').should.eventually.become('Dalek says: EXPLAIN');
        });

        it('should be rejected if module not found', function() {
            var explain = new Explain({
                _: _,
                Q: Q,
                requireHelper: require('../lib/helper/require')({
                    _: _,
                    Q: Q
                })
            });
            return explain.explain('notfound').should.eventually.be.rejected;
        });
    });
});
