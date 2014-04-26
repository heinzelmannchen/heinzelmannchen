var mixin = require('../lib/mixin');

describe('mixin', function() {
    describe('#mixin', function() {
        it('should mixin a class and its dependancies', function() {
            var me = {};
            me.mixin = mixin({
                _: require('underscore')
            });
            me.mixin(function(dependancies) {
                return dependancies;
            }).inject({
                moo: 'boo'
            });
            me.moo.should.be.eql('boo');
        });

    });
});
