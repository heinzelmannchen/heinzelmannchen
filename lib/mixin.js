module.exports = function(defaultDependancies) {
    var _ = defaultDependancies._;
    return function(klass) {
        var me = this;
        return {
            inject: function(dependancies) {
                _.extend(me, klass(_.extend(defaultDependancies, dependancies)));
            }
        };
    };
};
