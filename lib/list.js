var Q = require('q');

module.exports = function($inject){
    Q = $inject.Q;

    return {
        get: get
    };
};

function get(config) {
    var q = Q.defer();
    q.resolve(Object.keys(config));
    return q.promise;
}
