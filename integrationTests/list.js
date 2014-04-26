var heinzel = require('../heinzel');
heinzel.list('generators').then(function(data) {
    console.log('done', data);
}).fail(function() {
    console.log(arguments);
});
