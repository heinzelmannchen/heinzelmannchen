var heinzel = require('../heinzel');

heinzel.explain('pg').then(function(data) {
    console.log('Explain: ', data);
}).fail(function() {
    console.log(arguments);
});
