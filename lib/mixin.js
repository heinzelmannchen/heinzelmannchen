module.exports = function(defaultDependancies) {
    var _ = defaultDependancies._;
    return function(klass) {
        var me = this;
        _.extend(me, klass(defaultDependancies));
        return {
            inject: function(dependancies) {
                _.extend(me, klass(_.extend(defaultDependancies, dependancies)));
            }
        };
    };
};
